# Intro to Stack ADT and Array Implementation

---
# Balanced Brackets Problem

How would you program a solution to this problem?

Determine if (), {}, [] are balanced.

Examples:

```text
[()]{}{[()()]()}
=> Balanced

[(])
=> Not Balanced
```

<!-- column -->
Valid Example (balanced)

```text
((()))
```

<!-- column -->
Invalid Example (unbalanced)

```text
((())
```

---

# How Do We Solve This Problem?

To determine whether brackets are balanced, we need a way to:

- Remember recently encountered opening brackets.
- Match each closing bracket with the correct opening bracket.
- Process the symbols in order.

Before writing code, we should think about what operations are needed.

---
# Using an ADT to Solve Problems

An **Abstract Data Type (ADT)** focuses on:

- What data is stored.
- What operations are available.
- How the data is used.

An ADT helps us think about the solution before worrying about implementation details.

- Common ADTs include **Stacks**, **Queues**, **Lists**, and **Trees**.
- As we become familiar with these ADTs, we can choose the one that best fits a problem.
- The right ADT can simplify both program design and algorithm development.

These requirements closely match the operations of a **Stack ADT**.

---
# Stack ADT

Data:
- Collection of items

Operations:
- push
- pop
- peek

> Not worried about ***implementation details*** just yet.

---
# What is a Stack?

<!-- column -->
![Image of stack of books](images/stack-books.jpg)
<!-- column -->
![Image of stack of coins](images/stack-coins.jpg)
<!-- column -->
![Image of stack of boxes](images/stack-boxes.jpg)

<!-- endcolumns -->
> ***Natural*** way of interacting with these... on the top

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
