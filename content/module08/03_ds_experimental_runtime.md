# Experimental Runtime Measurement in Java

---

# Overview

- Measure elapsed time with Java's timing methods
- Understand why timings vary between runs
- Design a fair recursion-versus-iteration experiment
- Prepare the code for measurement, repeat trials, and record measurements
- Separate observations from claims about all programs or computers

---

# What Are We Measuring?

An experiment asks: How much elapsed time did this code take under these conditions?

- Choose the task and input size
- Decide exactly which operations to time
- Keep the implementation and environment documented
- Repeat the measurement instead of trusting one run

Elapsed time is not a direct measurement of Big-O complexity or memory use.

---

# The Java Timing Methods

Java has no `System.time()` method. Capitalization matters:

| Method | Purpose |
| --- | --- |
| `System.currentTimeMillis()` | Clock time in milliseconds; useful for timestamps |
| `System.nanoTime()` | Time source for measuring elapsed intervals |

Use differences between `nanoTime()` readings in the same JVM.
Its origin is arbitrary; it is not a date or time of day.

Nanosecond units do not guarantee nanosecond resolution or accuracy.

<!-- footer -->
https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/System.html#nanoTime()

---

# Start, Do the Work, Stop

Inside `main()`, with `data` already prepared:

```java
long start = System.nanoTime();
long answer = sumIterative(data);
long elapsedNs = System.nanoTime() - start;

System.out.println("Answer: " + answer);
System.out.println("Elapsed ns: " + elapsedNs);
```

Print after the second reading. The interval measures elapsed time, including any pauses while the program waits for CPU time.

---

# Choose a Useful Time Scale

- **1 second = 1,000 milliseconds**
- **1 millisecond = 1,000,000 nanoseconds**
- A short operation may finish within a single millisecond
- Millisecond readings can make different durations appear identical, or appear to take zero time

For short intervals, use `System.nanoTime()` to retain finer detail. You can convert afterward:

```java
double elapsedMs = elapsedNs / 1_000_000.0;
```

The decimal divisor avoids discarding fractions of a millisecond through integer division.

---

# Finer Units Do Not Guarantee a Clear Difference

When measurements are too small to distinguish meaningfully:

- Time a batch of calls to make the interval longer
- Repeat trials to see how much the measurements vary
- Keep input size and repetitions consistent when comparing methods

Converting a millisecond reading into nanoseconds only changes its units; it cannot recover missing detail.

More displayed digits do not remove timer limitations or system noise. A small difference may still be too uncertain to interpret.

---

# Why This Is Not an Exact Science

- Other applications and operating system tasks share the processor
- JVM garbage collection can pause execution
- CPU power management and temperature can change execution conditions
- Caches and previous work can affect later runs
- Reading the timer and running the measurement code also take time

A different time does not automatically mean the algorithm changed.

---

# The JVM Changes How Code Runs

The JVM's just-in-time compiler can optimize frequently executed code while the program runs.

- Early calls may include class loading and compilation activity
- Inlining can change method-call overhead
- Work with an unused result may be removed
- Constant or repeated inputs can enable additional optimizations

Using computed results helps keep the work observable, but does not prevent every optimization.

---

# What Is Warm-Up?

**Warm-up** means running the code several times before collecting measurements.

- These practice runs give the JVM a chance to load classes and optimize frequently used code
- Use the same methods and representative inputs you plan to measure
- Exclude warm-up runs from the recorded trials
- There is no fixed number of calls that guarantees optimization is finished

Warm-up helps reduce startup effects; it does not eliminate system noise or make a classroom stopwatch experiment precise.

---

# Plan a Fair Comparison

Question: How can we measure two ways of summing the same array?

- Give both methods the same array and require the same result
- Create input outside the timed section
- Use the same number of calls for both versions
- Avoid printing, file access, and input prompts while timing
- Run normally, without debugger stepping or breakpoints

Choose input sizes that both implementations can handle.

---

# Iterative Array Sum

Put the following methods inside a class named `RuntimeExperiment`:

```java
static long sumIterative(int[] data) {
    long total = 0;
    for (int value : data) {
        total += value;
    }
    return total;
}
```

The return value gives us a way to check correctness and use the computed work.

---

# Recursive Array Sum

```java
static long sumRecursive(int[] data, int index) {
    if (index == data.length) {
        return 0;
    }
    return data[index] + sumRecursive(data, index + 1);
}
```

Start with `sumRecursive(data, 0)`.

This example makes one recursive call per element. Start with modest array sizes; a `StackOverflowError` is a failed trial, not a runtime measurement. Do not assume Java eliminates tail calls.

---

# Prepare Input and Check Correctness

Start a `main()` method in the same class:

```java
public static void main(String[] args) {
    int n = args.length == 0 ? 100
                            : Integer.parseInt(args[0]);
    int[] data = new int[n];
    java.util.Random random = new java.util.Random(211);
    for (int i = 0; i < n; i++) {
        data[i] = random.nextInt(100);
    }
    if (sumIterative(data) != sumRecursive(data, 0)) {
        throw new IllegalStateException("Results differ");
    }
    // Continue main() with the later examples.
```

Use a positive size. The fixed seed makes input generation reproducible; both methods read the same values.

---

# Time a Batch of Calls

Add these two helper methods outside `main()`, inside the class:

```java
static long batchIterative(int[] data, int repetitions) {
    long checksum = 0;
    for (int r = 0; r < repetitions; r++) {
        checksum += sumIterative(data);
    }
    return checksum;
}

static long batchRecursive(int[] data, int repetitions) {
    long checksum = 0;
    for (int r = 0; r < repetitions; r++) {
        checksum += sumRecursive(data, 0);
    }
    return checksum;
}
```

Batching makes the interval longer, but includes loop overhead and can itself be optimized. Keep the batch size documented.

---

# Warm Up Before Recording Trials

Continue inside `main()`:

```java
int repetitions = 1000;
long observed = 0;
for (int w = 0; w < 20; w++) {
    observed += batchIterative(data, repetitions);
    observed += batchRecursive(data, repetitions);
}
```

- These are starter settings, not a guarantee of sufficient warm-up
- Do not record warm-up calls as measured trials
- Keep their results in `observed`, which will be printed later
- If measured intervals are extremely short, adjust the batch size consistently for both versions

---

# Measure Both Versions

After warm-up, continue inside `main()`:

```java
long[][] times = new long[10][2];
for (int trial = 0; trial < times.length; trial++) {
    for (int position = 0; position < 2; position++) {
        int method = (trial + position) % 2;
        long start = System.nanoTime();
        long result;
        if (method == 0) {
            result = batchIterative(data, repetitions);
        } else {
            result = batchRecursive(data, repetitions);
        }
        long elapsed = System.nanoTime() - start;
        times[trial][method] = elapsed;
        observed += result;
    }
}
```

Column 0 is iteration; column 1 is recursion. Alternating order reduces always-first bias, but does not remove all bias. The branch and helper calls are also inside the interval.

---

# Print After All Trials

Finish `main()` with:

```java
System.out.println("trial,n,repetitions,iterative_ns,recursive_ns");
for (int t = 0; t < times.length; t++) {
    System.out.printf("%d,%d,%d,%d,%d%n",
        t + 1, n, repetitions, times[t][0], times[t][1]);
}
System.out.println("Checksum: " + observed);
}
```

Wrap all methods in `public class RuntimeExperiment { ... }` and save as `RuntimeExperiment.java`. The last brace above closes `main()`; add another to close the class.

Printing the checksum makes results observable. It does not prevent every possible compiler optimization.

---

# Run a Small Experiment

From a terminal with a JDK available:

```text
javac RuntimeExperiment.java
java RuntimeExperiment 100
java RuntimeExperiment 200
java RuntimeExperiment 400
```

- These are starting input sizes, not expected results
- Repeat each command to collect trials from fresh JVM processes
- Keep the code, JDK, machine, and batch settings consistent
- Record failures separately and reduce sizes if recursion exceeds the stack

---

# Record Conditions Alongside Times

Record the JDK version, operating system, machine, input seed, warm-up settings, repetitions, and any unusual background activity.

| Input size | Process/run | Trial | Method | Batch time (ns) |
| --- | --- | --- | --- | --- |
| | | | | |

- Retain all raw trials; do not select only convenient measurements
- Compare medians and the spread across trials
- For a batch average, divide elapsed time by repetitions using floating-point arithmetic
- Label it an average per call, not a measurement of each individual call

---

# A Second Experiment: Binary Search

Use recursive and iterative binary search implementations that both return a matching index or `-1`.

1. Build a sorted array outside the timed section
2. Prepare the same sequence of search keys for both versions
3. Include successful and unsuccessful searches
4. Check correctness before timing; duplicates may allow different valid matching indices
5. Time batches of searches, accumulating returned indices into a checksum
6. Repeat with different array sizes while documenting the key-selection rule

State whether each trial measures one search or a batch. Keep sorting and key generation outside the interval.

---

# What This Experiment Cannot Establish Alone

- One run does not describe every machine, JVM, input, or implementation
- Timings do not directly reveal allocation or stack memory usage
- A few input sizes cannot prove an asymptotic complexity claim
- Warm-up and alternating order do not eliminate optimization or system noise

For rigorous Java microbenchmarks, explore **JMH**, which provides benchmarking infrastructure. It still requires careful workload design.

---

# Summary

- Define equivalent work and verify correctness first
- Use `System.nanoTime()` differences for elapsed intervals
- Prepare input and print output outside the timed section
- Warm up, repeat trials, vary order, and document conditions
- Preserve results and acknowledge JVM and system effects
- Use the procedure to collect evidence; no outcome is supplied here

---

# References and Further Reading

- [Java System timing methods](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/System.html#nanoTime())
- [OpenJDK JMH: unused results and dead-code elimination](https://github.com/openjdk/jmh/blob/master/jmh-samples/src/main/java/org/openjdk/jmh/samples/JMHSample_08_DeadCode.java)
- [OpenJDK JMH: pitfalls of manual timing loops](https://github.com/openjdk/jmh/blob/master/jmh-samples/src/main/java/org/openjdk/jmh/samples/JMHSample_11_Loops.java)
