# CIS 211 Exam 2

Modules 3-4

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

- Arrays
- Big O, time complexity
- Linked List
- Linked Node implementation of a Stack
- Iterators
- Reference variables
- null value (in relation to iterators and also objects in general)

---

# Arrays vs Linked Lists

| Arrays | Linked Lists |
|------|------|
| Contiguous Memory | Not contiguous Memory |
| Immutable (fixed in length/size) | Mutable/Flexible |
| No memory overhead per element | Extra memory overhead |
| Random access | No random access |

---

# Reference Variables and Objects

- Null value
- Garbage collection

---

# Big O

- What is it?
- What is time complexity of…
- Which time complexities are “faster” than others

---

# Linked List

- How do we insert at the middle? Big O?
- Iterating through a list
- How to check if it’s empty
- How to check if you’ve reached the tail

---

# Pseudocode questions

- With a stack implemented using a linked list where the head of the linked list is the top of the stack, how would you implement a “peekBottom” method?

---

# Pseudocode questions

- With a stack implemented using a linked list where the head of the linked list is the top of the stack, how would you implement a toString method that only displays every other element from top to bottom?

---

# What’s missing?

```java
public T pop() {
   if (head==null) return null;
   else {
       T item = head.data;
       head = head.next;
       return item;
   }
}
```

---

# Answer

```java
public T pop() {
   if (head==null) return null;
   else {
       T item = head.data;
       head = head.next; count--;
       return item;
   }
}
```

---

# What’s missing?

```java
public T push(T item) {
Node node = new Node();
node.data = item;
node.next = head;
head = node;
count++;
}
class Node {
    T data; Node next;
}
}
```

---

# Answer

```java
public T push(T item) {
Node node = new Node();
node.data = item;
node.next = head;
head = node;
count++;
}
class Node {
    T data; Node next;
}
}
```
