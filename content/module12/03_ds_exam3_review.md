# CIS 211 Exam 3 Review

---

# How to Prepare

- Review the concepts and trade-offs for each data structure.
- Practice tracing code and predicting its output.
- Practice writing short methods and pseudocode without an IDE.
- Be ready to explain your reasoning, not just identify an answer.
- The practice questions below are examples for studying; they are not exam questions.

---

# Topics

- Circular arrays and queue operations
- Doubly linked lists and deque operations
- Iterators, references, and `null`
- Big O runtime for common operations
- Maps and hash tables
- Hash functions and collisions
- Collision resolution:
  - Closed hashing (linear probing)
  - Open hashing (separate chaining)

---

# Circular Arrays

- Store items in a fixed-size array and reuse freed positions by wrapping around.
- Keep track of the front position and the number of items.
- Use modulo to wrap an index back to the start of the array.
- A circular array avoids shifting all remaining items after a dequeue.
- The array is still fixed in size; it does not provide unlimited capacity.

```java
int nextIndex = (index + 1) % queue.length;
```

---

# Circular Array Queue

- A queue is FIFO: items are added at the back and removed from the front.
- With a front index and item count, the logical position `offset` from the front is:

```java
int index = (front + offset) % queue.length;
```

- Visit exactly `count` items. Do not assume the front index is less than the back index.
- Enqueue and dequeue are typically **O(1)** when the array has available capacity.
- Reading or displaying all items is **O(n)**.

---

# Sample: Circular Array Index

Suppose `queue.length` is `8`, `front` is `6`, and the queue has `4` items. Which array index contains the item two positions after the front?

- `0`
- `2`
- `6`
- `8`

<div class="fragment">

### Answer

**0** — `(front + offset) % queue.length` gives `(6 + 2) % 8`, which is `0`.

</div>

---

# Sample: Visit Every Other Queue Item

Write pseudocode to display every other item in a circular-array queue, starting with the front item. Assume you have `queue`, `front`, and `count`.

<div class="fragment">

### One Possible Approach

```java
for (int offset = 0; offset < count; offset += 2) {
    int index = (front + offset) % queue.length;
    System.out.print(queue[index] + " ");
}
```

Use a logical offset from the front, then convert it to an array index with modulo. This works even when the queue wraps around.

</div>

---

# Sample: Circular Array Queue Operations

Practice writing or tracing these operations:

- Remove and return the front item, updating the front index and count.
- Return an item a few positions from the front without changing the queue.
- Display the queue in logical order when its contents span the end and start of the array.

<div class="fragment">

### Check Your Reasoning

- Advance the front with `(front + 1) % queue.length`.
- Use `count` to know how many items are in the queue.
- A nondestructive peek reads an item; it does not change `front` or `count`.
- Check the empty-queue behavior required by the method before accessing an array item.

</div>

---

# Doubly Linked Lists

| Doubly Linked Lists |
|------|
| Nodes are connected using `next` and `prev` references |
| Can grow or shrink as nodes are added or removed |
| Store extra reference data in each node |
| Do not provide random access by index |
| Can be traversed forward or backward |

- If `head` is the first node, `head.prev` is `null`.
- If `tail` is the last node, `tail.next` is `null`.
- An empty list commonly has `head == null` and `tail == null`.
- An iterator is at the head when it refers to the head node; in a nonempty list, that node's `prev` is `null`.

---

# Deque Operations

- A deque supports adding and removing items at both ends.
- With references to both `head` and `tail`, adding or removing at either end is typically **O(1)**.
- Searching for a particular position requires traversal and is **O(n)**.
- Building a string containing all items is **O(n)**.
- To traverse in reverse order, start at `tail` and follow `prev`.

---

# Sample: Link Updates

When inserting a new node at the front of a nonempty doubly linked list, which existing link must be updated so the old first node points back to the new node?

- `head.prev`
- `tail.next`
- `head.next`
- `tail.prev`

<div class="fragment">

### Answer

Set the old head's `prev` reference to the new node. Then update `head` to refer to the new node.

</div>

---

# Sample: Remove a Middle Node

Suppose `current` refers to a node that has both a previous and a next node. Describe how to unlink it from a doubly linked list.

<div class="fragment">

### Answer

Connect its neighbors to each other:

```java
current.prev.next = current.next;
current.next.prev = current.prev;
```

This assumes `current` is not the head or tail. Removing an end node requires updating the corresponding `head` or `tail` reference.

</div>

---

# Sample: Traverse a Deque Backward

Write pseudocode to visit every deque item from the back toward the front. Assume the back is `tail`.

<div class="fragment">

### One Possible Approach

```java
Node itr = tail;
while (itr != null) {
    System.out.print(itr.data + " ");
    itr = itr.prev;
}
```

For a reverse-order `toString`, build and return a string instead of printing each item.

</div>

---

# Sample: Iterator at the Head

Assume `itr` refers to a node in a nonempty doubly linked list. What condition checks whether it is at the head?

<div class="fragment">

### Answer

```java
itr.prev == null
```

The head has no previous node. This check assumes `itr` is not `null`.

</div>

---

# Big O Review

| Operation | Typical Runtime |
|------|------|
| Circular-array queue enqueue/dequeue | O(1) |
| Circular-array queue traversal or display | O(n) |
| Doubly linked deque add/remove at either end | O(1) |
| Doubly linked list traversal or `toString` | O(n) |
| Hash-table operation, average case | O(1) |
| Hash-table operation, worst case | O(n) |

- Hash-table average-case runtimes assume a suitable hash function and a controlled load factor.
- If many keys land in the same location, operations can approach **O(n)**.

| Hash-table operation | Separate chaining, average | Linear probing, average |
|------|------|------|
| `get`, `put`, or `remove` | O(1) | O(1) |

- These average-case runtimes assume a good hash function and a suitably sized table.
- In the worst case, searching a bucket or probing through the table can take **O(n)**.

---

# Map ADT and Hash Tables

- A map stores key-value pairs.
- A key is used to find its associated value.
- A hash function converts a key into an array index.
- The hash function returns an integer; the table uses that result to select a bucket or slot.
- Inserting a key already in the map usually updates its value rather than adding a duplicate key.
- Hash tables are not designed to return entries in sorted or insertion order.

---

# Hash Functions and Collisions

- Different keys can produce the same table index; this is a collision.
- A good hash function spreads keys relatively uniformly across the table.
- A larger table often reduces collisions, but does not guarantee that collisions disappear.
- The function must produce a valid index for the table.
- When a hash function uses characters, remember that Java `char` values are numeric character codes.

```java
private int hash(K key) {
    String text = key.toString();
    int code = text.charAt(0);
    return code % table.length;
}
```

---

# Sample: Calculate a Hash Index

For practice, use this hash function with a table length of `7`:

```java
int code = key.toString().charAt(0);
return code % table.length;
```

Use the character codes `A = 65`, `B = 66`, and `C = 67`. Find the index for keys beginning with `A`, `B`, and `C`. Do any of those keys collide?

<div class="fragment">

### Answer

- `A`: `65 % 7 = 2`
- `B`: `66 % 7 = 3`
- `C`: `67 % 7 = 4`

These three starting characters map to different indexes. Always apply the modulo operation using the current table length.

</div>

---

# Collision Resolution

| Strategy | How It Works | Advantages | Trade-offs |
|------|------|------|------|
| Closed hashing (linear probing) | Search for another open slot in the array | Entries need no separate chain nodes; can have good locality | Clusters can form; deletion needs care; performance worsens as the table fills |
| Open hashing (separate chaining) | Each array position stores a collection of entries | Handles collisions in a bucket; can grow beyond the number of buckets | Requires extra memory for collections/nodes; long chains make operations slower |

- In linear probing, continue checking slots using wrap-around indexing.
- In separate chaining, search only the collection at the key's bucket.
- Consider expected table size, memory use, and deletion behavior when comparing strategies.

---

# Sample: Choose a Collision Strategy

You expect the number of stored keys to vary substantially, and keeping the table below a fixed occupancy is difficult. Which collision strategy may be easier to accommodate, and why?

<div class="fragment">

### Answer

**Separate chaining** can accommodate multiple entries in a bucket without requiring every entry to occupy its own array slot. It still uses extra memory, and long chains can reduce performance.

</div>

---

# Sample: Separate Chaining `put`

What should a `put` method do if the bucket for a key is currently `null`? What should it do if the key already exists in that bucket?

<div class="fragment">

### Answer

- Create an empty bucket collection before iterating through it.
- If an entry with an equal key is found, replace its value and return without increasing the number of keys.
- Otherwise, add a new entry and increase the size.

</div>

---

# Sample: Linear Probing

In a linear-probing table, a search starts at the key's hash index and checks subsequent slots. Why must the search wrap around, and what condition prevents it from searching forever if the key is absent?

<div class="fragment">

### Answer

Use modulo table length to wrap from the last slot to index `0`. Stop when an unused slot is reached or when the search returns to its starting index. A full table and deletion markers require additional care in the implementation.

</div>

---

# Final Study Checklist

- Can you trace a circular queue when its front is near the end of the array?
- Can you write a nondestructive peek using a logical offset and modulo?
- Can you update both links when inserting or removing a doubly linked node?
- Can you handle empty-list and end-node cases?
- Can you traverse a doubly linked list in either direction?
- Can you compare O(1) end operations with O(n) traversal?
- Can you compute a hash index and identify collisions?
- Can you explain how table size and hash distribution affect collisions?
- Can you compare linear probing with separate chaining?
- Can you explain average-case versus worst-case hash-table performance?
