# Deque ADT

---

# Double-Ended Queue
- Pronounced "deck"
- Queue adds on one side and removes from the opposite side
- Deque adds from both sides and removes from both sides

---

# Deque ADT

- `java.util.Deque`

![Deque interface diagram](images/deque-interface-diagram.png)

<!-- footer -->
https://docs.oracle.com/javase/8/docs/api/java/util/Deque.html

---

# All Known Implementing Classes

- ArrayDeque
- ConcurrentLinkedDeque
- LinkedBlockingDeque
- LinkedList

---

# Uses of deques
- Browser history management
- Undo operations
- Breadth-first search (BFS)
- Task management systems
- Queueing systems
- Caching systems

<!-- footer -->
https://www.geeksforgeeks.org/applications-advantages-and-disadvantages-of-deque/

---

# Let's just use an array instead

- A circular array, since those are cool

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

![Singly linked list issue](images/sll-tail-traversal.png)

---

# Doubly Linked Lists

---

# Doubly Linked List Structure

References to:
- Head
- Tail

Nodes contain:
- Previous
- Next
- Data

![Doubly linked list diagram](images/doubly-linked-list-diagram.png)

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

![Remove node example](images/remove-middle-example-1.png)

![Remove node example](images/remove-middle-example-2.png)

---

# Algorithm for remove a node in the middle
- Find the node
- Determine which side is closer
- Use count and index to choose traversal direction
- Use a loop with a current iterator node
- Orphan the target node
- Stitch neighboring nodes together

![Middle removal algorithm diagram](images/remove-middle-algorithm.png)

---

# Time complexity of remove from middle?

---

# Circular Linked List

---

# Circular Singly Linked List

![Circular singly linked list](images/circular-sll.png)

---

# Circular Doubly Linked List

![Circular doubly linked list](images/circular-dll.png)

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
