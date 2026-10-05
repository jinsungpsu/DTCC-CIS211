# Deque ADT Implemented with Linked Nodes

---

# Pros/Cons of Arrays? They stay the same

## Arrays
- Immutable
- Random Access
- No memory overhead per element

## Linked Lists
- Mutable
- No random access
- Memory overhead per element

---

# A deque (and queue)...
- Doesn't benefit from random access
- Linked lists provide mutability
- At the cost of memory overhead

---

# Using a (singly) linked list
- Operations on both ends are inefficient
- Only keep track of the head node
- Must traverse the entire list to reach the tail

![Singly linked list issue](images/sll.png)

---

# Doubly Linked Lists

---

# Doubly Linked List Structure

<!-- column -->

References to:
- Head
- Tail

Nodes contain:
- Previous
- Next

- Data
<!-- column -->

![Doubly linked list diagram](images/dll-diagram.png)

---

# Implementation Details for DLL

```java
class DoublyLinkedList<T> {
    private Node head, tail;

    class Node {
        T data;
        Node prev, next;
    }
}
```

---

# Visualgo.net

<!-- footer -->
https://visualgo.net/en/list

---

# Fast O(1) operations on both ends
- enqueue / addBack
- dequeue / removeFront
- getFront
- getBack

---

# Other operations

Removing from the middle.

<!-- column -->
![Remove node example](images/del-dll-viz2.png)

<!-- column -->
![Remove node example](images/del-dll.png)

---

# Algorithm for remove a node in the middle
- Find the node
- Determine which side is closer
- Use count and index to choose traversal direction
- Use a loop with a current iterator node
- Orphan the target node
- Stitch neighboring nodes together

---

# Time complexity of remove from middle?

---

# Circular Linked List

---

# Circular Singly Linked List

![Circular singly linked list](images/circular-sll.png)

---

# Circular Doubly Linked List

![Circular doubly linked list](images/circular-dll2.png)

---

# Why?
- Continuous traversal
- Faster access

---

# Big picture summary so far…

## ADTs
- List
- Stack
- Queue
- Deque

## Implementations
- Array
- SLL
- Circular Array
- DLL
- Circular SLL
- Circular DLL

---

# ADTs and Implementations

## Stack
- Array
- Circular Array
- SLL
- DLL
- Circular SLL/DLL

## Queue
- Array
- Circular Array
- SLL
- DLL
- Circular SLL/DLL

## Deque
- Array
- Circular Array
- SLL
- DLL
- Circular SLL/DLL
