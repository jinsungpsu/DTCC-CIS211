# CIS 211 Exam 1 Review

---

# How to Prepare

- Review the main concepts and trade-offs for each topic.
- Practice tracing code and predicting its output.
- Practice writing short methods and pseudocode without an IDE.
- Be ready to explain your reasoning, not just identify an answer.
- The practice questions below are examples for studying; they are not exam questions.

---

# Assessment Policies

This assessment is closed resource (no notes, PowerPoint, textbook, internet, etc.). If you open another internet browser or tab, it will be considered cheating. You may not leave the testing area for any reason. If you have any extenuating circumstances that may require any exceptions, please let the instructor/proctor know as soon as you can.

This assessment MUST be completed using D2L on a lab computer during the scheduled time and location; you may not use your own device or take this assessment at a different location without prior approval.

---

# Exam Format

- No IntelliJ; be prepared to reason from concepts and short code examples.
- Expect a mix of multiple choice, select-all-that-apply, conceptual, code-related, and written-response questions.
- You may be asked to write short code or pseudocode.

---

# Topics

- OOP
- Arrays - characteristics
- Stack, operations
- Array implementation of a Stack
- Exceptions
- Interfaces
- Generics

---

# OOP

- Classes & objects
- Data fields:
  - Why keep them private?
  - How do other classes access them?

---

# Interfaces

- Why are they commonly used?

---

# Generics

- Why are they useful?

---

# Exceptions

- Mechanics on how to use them (throw/catch)

---

# Arrays

| Arrays |
|------|
| Contiguous Memory |
| Fixed length (size cannot change after creation) |
| No memory overhead per element |
| Random access |

---

# Manipulating arrays

- How to iterate through contents of an array?
- How to manipulate contents of an array

---

# Sample: Complete an Array Loop

Complete the loop so it displays every element in
the array.

```java
int[] arr = {3, 6, 9, 12};

for (int i = 0; /* missing */; i++) {
    System.out.print(arr[i] + " ");
}
```

<div class="fragment">

### Answer

```java
for (int i = 0; i < arr.length; i++) {
    System.out.print(arr[i] + " ");
}
```

</div>

---

# Stack ADT

- `push`, `pop`, `peek`
- LIFO (last in, first out)

> Stack examples in this review use `count` to track the number of items.

---

# Sample: Peek at the Bottom

With a stack implemented using an array where index 0 is the top, describe how to return the bottom item without removing it.

<div class="fragment">

### One Possible Approach

If the stack is nonempty, return `stack[count - 1]`. Reading this value does not change the stack.

</div>

---

# Sample: Display Every Other Stack Item

With a stack implemented using an array where index 0 is the top, describe how to display every other item from bottom to top.

<div class="fragment">

### One Possible Approach

Start at index `count - 1` and move downward by two positions, stopping when the index is negative.

```java
for (int i = count - 1; i >= 0; i -= 2) {
    System.out.print(stack[i] + " ");
}
```

</div>

---

# Sample: Check Capacity Before Push

```java
public void push(T item) throws IllegalStateException {
   if ( /* missing code */ ) {
       throw new IllegalStateException("Can't add...");
   }
   stack[count++] = item;
}
```

<div class="fragment">

### Answer

```java
public void push(T item) throws IllegalStateException {
   if (count == stack.length) {
       throw new IllegalStateException("Can't add...");
   }
   stack[count++] = item;
}
```

</div>

---

# Sample: Build a String from the Stack

```java
@Override
public String toString() {
   if (count==0) {
       return "[ ]";
   } else {
       String o = "";
       /* missing code */ {
           o += stack[i] + " ";
       } return o;
   }
}
```

<div class="fragment">

### Answer

```java
@Override
public String toString() {
   if (count==0) {
       return "[ ]";
   } else {
       String o = "";
       for (int i = 0; i < count; i++) {
           o += stack[i] + " ";
       } return o;
   }
}
```

</div>

---

# Final Study Checklist

- Can you explain classes, objects, private fields, and interfaces?
- Can you explain why generics are useful?
- Can you describe how exceptions are thrown and caught?
- Can you compare array characteristics such as fixed size, contiguous storage, and random access?
- Can you iterate through and update array contents safely?
- Can you explain stack operations and LIFO behavior?
- Can you implement or trace stack operations using a `count` variable?
- Can you write short array-based stack methods and pseudocode without an IDE?
