# Review
- ArrayList class

---

# Java Interfaces

---

# ADT/Interface - no implementation details

> “An Interface in Java programming language is defined as an abstract type used to specify the behavior of a class...”

<!-- footer -->
https://www.geeksforgeeks.org/interfaces-in-java/

---

# Uses of Interfaces
- Achieve total abstraction
- Support multiple inheritance through interfaces
- A class can extend one class but implement many interfaces

---

# Implementing an Interface

```java
class ArrayStack implements Stack {
}
```

---

# From previous examples

- “List” ADT and implementations

---

# Example of a List interface

```java
interface List {
    public void add(int item);
    public void remove(int item);
    public int size();
}
```

---

# Example of List implementation

```java
class ArrayList implements List {
    // this class MUST implement all public methods in interface
}
```

---

# java.util.List
- It's an interface
- Implementations:
  - java.util.ArrayList
  - java.util.LinkedList

---

# Polymorphism…

```java
List<Integer> numList = new ArrayList<>();
List<Integer> numList2 = new LinkedList<>();
```

---

# Java Generics

---

# ArrayList<?>
- ArrayList<Integer>
- ArrayList<Character>

---

# What is Generics?

Generics means parameterized types.

<!-- footer -->
https://www.geeksforgeeks.org/generics-in-java/

---

# Why Generics?
1. Code Reuse
2. Type Safety

---

# More on Type Safety

Java enforces type safety through its object model.

<!-- footer -->
https://www.baeldung.com/cs/type-safety-programming

---

# Not really doing any type safety right now…

Only current guarantee is that the generic type is a subclass of Object.

---

# Future Type Constraints

```java
class ArrayStack<E extends Comparable> {
}
```

<!-- footer -->
https://docs.oracle.com/javase/8/docs/api/java/lang/Comparable.html

---

# Array Implementation of List ADT

---

# Generic List interface

```java
interface List<T> {
    public void add(T item);
    public void remove(int index);
    public int size();
}
```

---

# Implementation of List Using Array

```java
class ArrayList<T> implements List<T> {
    public void add(T item) { }
    public void remove(T item) { }
    public int size() { }
}
```

---

# Stack ADT

---

# How would you do this problem?

Given an expression string, determine whether brackets are balanced.

Example:

```text
[()]{}{[()()]()}
```

Output: Balanced

```text
[(])
```

Output: Not Balanced

---

# Example - valid

```text
((()))
```

---

# Example - invalid

```text
((())
```

---

# Example - valid

```text
(1+1)([1 x (2)])
```

---

# Example - invalid

```text
(1+1)([1 x (]2))
```

---

# ADT - abstract data type

Stack operations:
- push
- pop
- peek

---

# What is a stack?

[Diagram showing stack structure]

---

# Stack Operations

```text
push(item)  -> add to top
pop()       -> remove from top
peek()      -> retrieve top item
```

---

# Order of operations
- FILO (First In Last Out)
- LIFO (Last In First Out)

---

# Interview Questions Using Stack

<!-- footer -->
https://www.geeksforgeeks.org/top-50-problems-on-stack-data-structure-asked-in-interviews/

---

# java.util.Stack

---

# java.util.Stack References
- Documentation
- Source Code

<!-- footer -->
https://docs.oracle.com/javase/8/docs/api/java/util/Stack.html

---

# Array Stack

---

# References
- General list - Shaffer 4.1
- Array List - Shaffer 4.1.1
- Stack - Shaffer 4.2
- Array Stack - 4.2.1

---

# ADT Focus

The program interacts with the Stack ADT through an interface and not its implementation.

---

# Arrays
- Fixed size
- Pre-allocated memory
- Contiguous memory locations
- Random access

---

# Making the “connection”

[Diagram connecting stack and array representation]

<!-- footer -->
https://www.geeksforgeeks.org/array-data-structure/

---

# Top of stack = index 0 of array

[Diagram showing top of stack at array index 0]

---

# Bottom of stack = index 0

[Diagram showing bottom of stack at array index 0]

---

# What happens during pop/push operations?

[Diagram illustrating push and pop operations]

---

# Push and Pop Examples

The presentation shows a sequence of stack push and pop operations using arrays, comparing:

- Top of stack at index 0
- Bottom of stack at index 0

with array-state tables after each operation.

[Series of diagrams and tables illustrating stack state changes]

---

# Which one is better?

Comparison of both stack-to-array mappings.

---

# Smart Decision - Bottom is index 0

- Avoid shifting elements left/right.
- Simpler and faster operations.
- Use count as the top-of-stack index.

---

# Stack ADT and Array Based Implementation in Java

```java
interface Stack<T> {
    public void push(T item);
    public T pop();
    public T peek();
}

class ArrayStack<T> implements Stack<T> {
    private final int DEFAULT_SIZE = 10;
    private T[] stack;
    private int count;
}
```

---

# Exceptions…

```java
/**
 * Adds a new entry to the top of the stack.
 * @param item An object to be added.
 * @throws IllegalStateException if capacity exceeded.
 */
void push(T item) throws IllegalStateException;
```

---

# Throwing exceptions

```java
void push(T item) throws IllegalStateException {
    if (count >= stack.length) {
        throw new IllegalStateException("Array is full!");
    }
}
```
