# Recursion Fundamentals

---

# Overview

- Identify base and recursive cases
- Trace countdown and factorial examples
- Recognize common termination errors

---

# What is recursion?

The process in which a function calls itself directly or indirectly is called recursion.

<!-- footer -->
https://www.geeksforgeeks.org/introduction-to-recursion-data-structure-and-algorithm-tutorials/

---

# Why recursion?

- Reduce code length
- Improve readability
- Express recursive problems naturally

<!-- footer -->
https://www.geeksforgeeks.org/introduction-to-recursion-data-structure-and-algorithm-tutorials/

---

# A more subtle definition of recursion

Recursion is the process of defining a problem in terms of a simpler version of itself.

Example:
- If you are at home, stop moving.
- Take one step toward home.
- Find your way home.

<!-- footer -->
https://users.cs.utah.edu/~germain/PPS/Topics/recursion.html

---

# Recursion Summary

- Matches trees and divide-and-conquer problems
- Simpler for naturally recursive problems
- Helps problem decomposition
- Can reduce code size

---

# Two main components:

- Base Case: stops recursion
- Recursive Case: function calls itself

---

# Common Recursive Errors

- Missing base case
- Base case never triggers
- Incorrect parameter changes
- Stack overflow

---

# Countdown example (iterative)

```java
for (int i = 10; i >= 0; i--) {
    System.out.print(i + " ");
}
```

Output:

```text
10 9 8 7 6 5 4 3 2 1 0
```

---

# Countdown example (recursive)

```java
public static void main(String[] args) {
   countdown(10);
}

static void countdown(int num) {
   if (num < 0) {
       return;
   }
   System.out.println(num + " ");
   countdown(num - 1);
}
```

---

# How Recursion Works

```java
int factorial(int n) {
    if (n == 0) return 1;
    return n * factorial(n - 1);
}
```

---

# Example – Factorial Calculation

```text
5! = 5 × 4 × 3 × 2 × 1 = 120
```

---

# Summary

- Recursion expresses a problem using smaller instances of itself
- A base case stops recursive calls
- Each recursive step must make progress toward termination
- Tracing calls helps explain how recursive results are produced
