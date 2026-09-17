# Linked Node Implementation of Stack ADT

---

# Abstract Data Type

- List is the ADT.
- ArrayList and LinkedList are implementations.
- Code interacts with both in the same way.

---

# Making the Connection
- Implementing the Stack ADT using a linked list
- Design decision required

---
# Stack Using a Singly Linked List

Suppose we want to implement a stack using a singly linked list.

```text
head
 ↓
+---+---+    +---+---+    +---+------+
| A | • | -> | B | • | -> | C | null |
+---+---+    +---+---+    +---+------+
```

Where should the **top of the stack** be?

- At the **head**?
- At the **tail**?

---
# Activity

With a partner, discuss:

1. Should the top of the stack be the **head** or the **tail**?
2. Where would `push()` add a new node?
3. Where would `pop()` remove a node?
4. Which choice would require less work?

> Be prepared to explain **why** your implementation is more efficient.

---
# Option A: Top at the Head

```text
TOP
 ↓
A -> B -> C -> null
 ^
head
```

Operations:

- `push(D)` adds a new node before `A`
- `pop()` removes `A`

Think about:

- How many nodes must be visited?
- Do we need to traverse the list?

---
# Option B: Top at the Tail

```text
head
 ↓
A -> B -> C
           ↑
          TOP
```

Operations:

- `push(D)` adds a node after `C`
- `pop()` removes `C`

Think about:

- How do we find the node before `C`?
- Can we move backward in a singly linked list?

---
# The Better Choice

Use the **head as the top of the stack**.

```text
TOP
 ↓
A -> B -> C -> null
 ^
head
```

Why?

- `push()` adds at the head
- `pop()` removes from the head
- No traversal is required

---
# Why Not the Tail?

```text
head
 ↓
A -> B -> C -> D
         ^
     must find
```

To remove `D`, we must first find the node before it.

Since a singly linked list only has `next` references:

- We cannot move backward.
- We must traverse from the head.

This requires extra work and makes the implementation less efficient.
---
# ***Preferred*** Implementation
Therefore, for a stack implemented with a singly linked list:

> Top of Stack = Head of List

---

# No random access!

- Operations nearer to the head are simpler.
- Linked structures track only one node directly.

---
# VisuAlgo Resource

VisuAlgo provides interactive visualizations for data structures and algorithms.

Use it to see operations performed step-by-step on various ADT's

We will use this resource throughout the semester to help visualize course concepts.

<!-- footer -->
https://visualgo.net/en/list

---

# Pushing to a stack

![Diagram showing push operation on linked stack](images/visualgo-stack-push.png)

<!-- footer -->
https://visualgo.net/en/list

---

# Removing from a list

![Diagram showing linked list removal](images/visualgo-linkedlist-remove.png)

<!-- footer -->
https://visualgo.net/en/list

---

# Popping from a stack

![Diagram showing pop operation on linked stack](images/visualgo-stack-pop.png)

<!-- footer -->
https://visualgo.net/en/list

---

# Interfaces

An interface defines a set of methods that a class must provide.

Interfaces describe **what** a class can do, not **how** it is implemented.

For example, different stack implementations may store data differently, but they can still provide the same operations:

- `push()`
- `pop()`
- `peek()`

<!-- footer -->
<a href="https://en.wikipedia.org/wiki/noopener noreferrer">https://en.wikipedia.org/wiki/Interface_(Java)</a>

---

# Capacity Restrictions?

Some stack interfaces include the method:

```java
void push(T item) throws IllegalStateException;
```

This means implementations may throw an exception when an item cannot be added.

For an **array-based stack**, this could happen if the stack is full.

For a **linked-list-based stack**, capacity restrictions generally do not apply because nodes can be added dynamically.

Different implementations may satisfy the same interface in different ways.
---
# What About the Exception?

```java
void push(T item) throws IllegalStateException;
```

Just because an exception appears in the interface does not mean every implementation must throw it.

For example:

- An array-based stack might throw the exception when the stack is full.
- A linked-list-based stack may never need to throw it.

The important part is that every implementation follows the interface contract.

As programmers, always check the interface and documentation to understand the expected behavior.
---
# Most Important Things to Remember

When comparing arrays and linked lists, focus on three key questions:

1. How quickly can we access an element?
2. How much memory is required?
3. How easy is it to change the size?

Tradeoffs are everywhere in Computer Science.

There is no "best" data structure.

The best choice depends on the operations your program performs most often.
---
# Arrays and Linked Lists

| Arrays | Linked Lists |
|---|---|
| Random Access | No Random Access |
| No Memory Overhead per Element | Memory Overhead per Element |
| Immutable | Mutable |