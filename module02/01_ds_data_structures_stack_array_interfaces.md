# Review

- ArrayList class

---
# Java Interfaces

---
# ADT/Interface - no implementation details

An interface in Java is an abstract type used to specify behavior.

<!-- footer -->
https://www.geeksforgeeks.org/interfaces-in-java/

---
# Uses of Interfaces

- Achieve abstraction
- Support multiple inheritance of type
- A class can implement multiple interfaces

---
# Implementing an Interface

```java
class ArrayStack implements Stack {
}
```

---
# From Previous Examples

- List ADT and implementations

---
# Example of a List Interface

```java
interface List {
    public void add(int item);
    public void remove(int item);
    public int size();
}
```

---
# Example of List Implementation

```java
class ArrayList implements List {
    // must implement all interface methods
}
```

---
# java.util.List

- Interface
- Implementations:
  - ArrayList
  - LinkedList

---
# Polymorphism

```java
List<Integer> numList = new ArrayList<>();
List<Integer> numList2 = new LinkedList<>();
```

---
# Java Generics

---
# ArrayList<?>

```java
ArrayList<Integer> myNums;
ArrayList<Character> myLetters;
```

---
# What is Generics?

Generics are parameterized types.

<!-- footer -->
https://www.geeksforgeeks.org/generics-in-java/

---
# Why Generics?

1. Code reuse
2. Type safety

---
# More on Type Safety

<!-- footer -->
https://www.baeldung.com/cs/type-safety-programming

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
# Generic List Interface

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
}
```

---
# Stack ADT

---
# Balanced Brackets Problem

Determine if (), {}, [] are balanced.

Examples:

```text
[()]{}{[()()]()}
=> Balanced

[(])
=> Not Balanced
```

---
# Valid Example

```text
((()))
```

---
# Invalid Example

```text
((())
```

---
# ADT - Abstract Data Type

Data:
- Collection of items

Operations:
- push
- pop
- peek

---
# What is a Stack?

[Diagram showing stack structure]

---
# Stack Operations

- push(item): add to top
- pop(): remove from top
- peek(): inspect top

---
# Order of Operations

- FILO
- LIFO

---
# Interview Questions Using Stack

<!-- footer -->
https://www.geeksforgeeks.org/top-50-problems-on-stack-data-structure-asked-in-interviews/

---
# java.util.Stack

---
# java.util.Stack Resources

<!-- footer -->
https://docs.oracle.com/javase/8/docs/api/java/util/Stack.html

---
# Array Stack

---
# References

- Shaffer 4.1 General List
- Shaffer 4.1.1 Array List
- Shaffer 4.2 Stack
- Shaffer 4.2.1 Array Stack

---
# ADT Focus

- Use the Stack interface
- Implementation details remain hidden

---
# Arrays

- Fixed size
- Contiguous memory
- Random access

---
# Making the Connection

[Diagram relating arrays to stacks]

---
# Top of Stack = Index 0

[Diagram]

---
# Bottom of Stack = Index 0

[Diagram]

---
# Push/Pop Demonstrations

The original PPT contains a long sequence of push() and pop() slides showing two array-stack implementations.

Slides represented below.

---
# push(2)

```text
0 1 2 3 4 5 6 7 8 9
2 1
```

---
# push(3)

```text
0 1 2 3 4 5 6 7 8 9
3 2 1
```

---
# push(4)

```text
4 3 2 1
```

---
# push(5)

```text
5 4 3 2 1
```

---
# pop() Sequence

```text
5 4 3 2 1
4 3 2 1
3 2 1
2 1
1
```

---
# Alternative Implementation

Bottom of stack stored at index 0.

Push sequence:

```text
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5
1 2 3 4 5 6
```

Pop sequence removes from the end.

---
# Which One Is Better?

Comparison of both implementations.

---
# Smart Decision - Bottom is Index 0

- No shifting required
- Simpler implementation
- Fast push/pop
- Keep track of count as top position

---
# Stack ADT and Array-Based Implementation

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
# Exceptions

```java
void push(T item) throws IllegalStateException;
```

---
# Throwing Exceptions

```java
void push(T item) throws IllegalStateException {
    if (count >= stack.length) {
        throw new IllegalStateException("Array is full!");
    }
}
```
