# CIS 211 Exam 1

---

# Policies

This assessment is closed resource (no notes, powerpoint, textbook, internet, etc.). If you open another internet browser or tab, it will be considered cheating. You may not leave the testing area for any reason. If you have any extenuating circumstances that may require any exceptions, please let the instructor/proctor know as soon as you can.

This assessment MUST be completed using D2L on a lab computer during the scheduled time and location; you may not use your own device or take this assessment at a different location without prior approval.

---

# Types of Questions

- No intelliJ
- Types of questions
- Multiple choice
- Multi select
- Written response
- Conceptual
- Specific code related
- Pseudocode

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
- Data fields
   - Why keep them private?
   - How to access them?

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
| Immutable (fixed in length/size) |
| No memory overhead per element |
| Random access |

---

# Manipulating arrays

- How to iterate through contents of an array?
- How to manipulate contents of an array

---

# Stack ADT

- push, pop, peek
- FILO

> Questions in exam will use count instead of top variable (used in Shaffer textbook)

---

# Pseudocode questions

- With a stack implemented using a array where index 0 of the array is the top of the stack, how would you implement a “peekBottom” method?

---

# Pseudocode questions

- With a stack implemented using a array where index 0 of the array is the top of the stack, how would you implement a toString method that only displays every other element from bottom to top?

---

# What’s missing?

```java
public void push(T item) throws IllegalStateException {
   if ( /* missing code */ ) {
       throw new IllegalStateException("Can't add...");
   }
   stack[count++] = item;
}
```

---

# Answer

```java
public void push(T item) throws IllegalStateException {
   if (count == stack.length) {
       throw new IllegalStateException("Can't add...");
   }
   stack[count++] = item;
}
```

---

# What’s missing?

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

---

# Answer

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
