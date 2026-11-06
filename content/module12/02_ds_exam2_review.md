# CIS 211 Exam 2 Review

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
| Contiguous memory | Nodes need not be contiguous |
| Fixed length | Can grow or shrink |
| No memory overhead per element | Extra memory overhead |
| Random access | No random access |

---

# Sample: Array vs Linked List

Which of the following are true about **arrays**? (Select all that apply)

- Elements are stored in contiguous memory locations.
- Sizes are mutable.
- Indices start at 0.
- Provide random (fast) access to elements in the middle.

<div class="fragment">

### Answer

Contiguous memory, indices start at 0, random access. **Sizes are not mutable.**

</div>

---

# Reference Variables and Objects

- A reference variable stores an **address**, not the object itself
- Reassigning a reference can make the old object eligible for **garbage collection**
- `null` means "points to no object"
- Multiple references can point to the **same** object
- Only reference types can be `null` — primitives cannot

---

# Sample: Reference Reassignment

What happens when you reassign a reference variable in Java?

- The variable points to both the old and new objects.
- Java throws an error.
- The old object is immediately destroyed.
- The variable now points to a new object, and the original may be garbage collected if no other references exist.

<div class="fragment">

### Answer

The last option — the old object is only **eligible** for GC; the JVM decides when to reclaim it.

</div>

---

# Big O

- What is it?
- What is time complexity of…
- Which time complexities are "faster" than others

---

# Sample: Big O Ranking

Rank the following from **fastest** (1) to **slowest** (5) as input size grows.

- O(n log n)
- O(n²)
- O(1)
- O(n)
- O(log n)

<div class="fragment">

### Answer

1. O(1)
2. O(log n)
3. O(n)
4. O(n log n)
5. O(n²)

</div>

---

# Sample: Time Complexity

What is the Big O time complexity of this method in terms of `n`?

```java
public static int sum(int[] arr) {
    int total = 0;
    for (int i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    return total;
}
```

- O(1)
- O(log n)
- O(n)
- O(n²)

<div class="fragment">

### Answer

**O(n)** — a single loop visits each element once.

</div>

---

# Sample: Time Complexity (N × M)

What is the Big O time complexity of this method in terms of `rows` and `cols`?

```java
public static void printGrid(int[][] grid) {
    for (int r = 0; r < grid.length; r++) {
        for (int c = 0; c < grid[r].length; c++) {
            System.out.print(grid[r][c] + " ");
        }
        System.out.println();
    }
}
```

- O(rows + cols)
- O(rows × cols)
- O(rows²)
- O(cols²)

<div class="fragment">

### Answer

**O(rows × cols)** — the outer loop runs `rows` times, and for each row the inner loop runs `cols` times. If the grid has `n` rows and `m` columns, this is **O(n × m)**.

If both loops instead iterate over the same `n` items, the total work is **O(n²)**.

</div>

---

# Linked List

- How do we insert at the middle? Big O?
- Iterating through a list
- How to check if it's empty
- How to check if you've reached the tail

---

# Sample: Interpret a Linked-List Condition

What is each condition checking for?

```java
if (head.next == null) { ... }
```

<div class="fragment">

### Answer

The list has **exactly one node** — `head` is also the tail.

</div>

---

# Sample: Find the Tail

```java
Node itr = head;

while (itr.next != null) {
    /*
     * missing code
     */
}

System.out.println(itr.data);
```

<div class="fragment">

### Answer

```java
itr = itr.next;
```

</div>

---

# Linked Stack

- Design decisions (top = head vs top = tail)
    - Big O implications for push, pop, peek

---

# Sample: Choose a Linked-Stack Design

You implement a stack with a singly linked list but only keep a reference to the **head**. Would you make the head the **top** or the **bottom** of the stack?

<div class="fragment">

### Answer

Make it the **top**.

- push / pop / peek = **O(1)**
- If head were the bottom, every push/pop/peek would require traversing to the tail → **O(n)**

</div>

---

# Sample: Remove the Top Stack Item

```java
public T pop() {
   if (head == null) return null;
   else {
       T item = head.data;
       /*
        * missing code
        * may be more than one line
        */
       return item;
   }
}
```
<div class="fragment">

### Answer
```java
head = head.next;
count--;
```

</div>

---

# Sample: Add the Top Stack Item

```java
public void push(T item) {
    Node node = new Node();
    /*
     * missing code
     * may be more than one line
     */
    head = node;
    count++;
}
class Node {
    T data;
    Node next;
}
```

<div class="fragment">

### Answer

```java
node.data = item;
node.next = head;
```

</div>

---

# Sample: Find the Bottom Stack Item

```java
public T peekBottom() {
    Node itr = head;
    /*
     * missing code
     * assume there is at least 1 item
     */
    return itr.data;
}
```

<div class="fragment">

### Answer

```java
while (itr.next != null) {
    itr = itr.next;
}
```

</div>

---

# Sample: Peek at the Bottom

With a stack implemented using a linked list where the head is the top, describe how to return the bottom item without removing it.

<div class="fragment">

### One Possible Approach

Start at `head` and follow `next` until reaching the last node (`itr.next == null`). Return that node's data without changing any links.

</div>

---

# Sample: Display Every Other Stack Item

With a stack implemented using a linked list where the head is the top, describe how to display every other item from top to bottom.

<div class="fragment">

### One Possible Approach

Visit nodes from `head` toward the tail, appending every other node's data to the result. For example, maintain a position counter and append when the position is even.

</div>
---

# Final Study Checklist

- Can you compare arrays and linked lists in storage, size flexibility, memory overhead, and access time?
- Can you analyze simple loops and state their Big O runtime?
- Can you explain how references, shared objects, reassignment, and `null` work?
- Can you traverse a linked list and identify its head, tail, and empty-list conditions?
- Can you explain how an iterator moves through a linked list?
- Can you choose a linked-stack design that keeps push, pop, and peek efficient?
- Can you write or trace linked-list stack operations and pseudocode without an IDE?