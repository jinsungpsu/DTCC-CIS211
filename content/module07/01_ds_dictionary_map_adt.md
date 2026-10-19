# Dictionary and Map ADTs

---

# Overview

- Identify keys, values, and entries.
- Describe dictionary operations and unique-key behavior.
- Compare array and linked-node implementation options.

---

# Dictionary/Map ADT

- A dictionary associates a **key** with a **value**.
- A key lets us look up its associated value.
- One key-value pair is called an **entry**.
- In this lecture, dictionary and map describe the same ADT.

Example: student ID -> student record

---

# What is it?

<!-- image bg="#ffffff" -->
![Dictionary mapping names to phone numbers](images/dictionary-phone-book-key-value-pairs.png)

- Key: a person's name; value: a phone number.
- A printed dictionary uses words as keys and definitions as values.

---

# A Familiar Dictionary

<!-- image size="30%" -->
![Printed dictionary definitions](images/dictionary-definition-photo.jpg)

Look up a word to retrieve its definition.

The key tells us **what to find**; the implementation determines **how to find it**.

---

# Access by Key, Rather Than Position

- A list uses a position: "Give me the item at index 3."
- A dictionary uses a key: "Give me the student with ID 700000001."
- Keys do not need to be consecutive integers.
- The dictionary ADT does not require a particular iteration order.

---

# ADT vs. Storage Structure

- Linear structures organize elements in a sequence.
- A dictionary describes associations between keys and values.
- Its implementation may still store entries in an array or linked list.
- Calling dictionaries "non-linear" does not tell us how entries are physically stored.

---

# Dictionary ADT Overview

Data:

- Entries containing a key and a value
- Unique keys; values may repeat

Core operations:

- Insert or update an association
- Remove an association by key
- Search for a value by key

---

# Operations + Parameters

| Abstract operation | Meaning |
|---|---|
| insert(key, value) | Associate a value with a key |
| remove(key) | Remove the entry for that key |
| search(key) | Retrieve the value for that key |

The ADT contract must define what happens for an existing key or a missing key.

We will define insert as adding a new key or updating the value for an existing key.

---

# How Could This Be Implemented?

<!-- column -->

- Arrays <!-- .element: class="fragment" data-fragment-index="0" -->
- Linked Nodes <!-- .element: class="fragment" data-fragment-index="1" -->

<!-- column -->

<div class="fragment" data-fragment-index="2" data-markdown>

- An array of key-value entries
- A linked list whose nodes each contain a key and a value


</div>

<!-- endcolumns -->

<div class="fragment" data-fragment-index="3" data-markdown>
Or... variations using circular arrays, singly linked lists, or doubly linked lists
Starting point: search through entries and compare their keys.

> Question: Does using an array automatically make lookup by key O(1)?

</div>

---

# Discussion/Demo of Array Implementation

Assume an unsorted array of entries with unique keys.

- Search: scan keys until a match is found ? O(n) worst case.
- Insert/update: check for an existing key before appending ? O(n).
- Remove: find the key, then fill the gap or shift entries ? O(n).
- Space: allocated capacity may exceed the number of entries.

---

# Discussion/Demo of Linked List Implementation

Assume an unsorted singly linked list of entries with unique keys.

- Search: traverse nodes and compare keys ? O(n) worst case.
- Insert/update: finding an existing key takes O(n); adding at the head takes O(1).
- Remove: locating the node and its predecessor takes O(n); unlinking takes O(1).
- Space: each node stores an entry and a link; no unused array slots.

---

# Let's Try to Improve It!
## Use an Associative Array

- As we have done before, let's try to improve the common operations' efficiencies
- Is it possible to move from O(n) to O(1)?

---
# Associative Array

- In a regular array, an integer index identifies a position.
- An associative array uses a key to identify a value.
- "Associative array" is another name for a dictionary/map.
- The name does not require an array-based implementation.

Arrays use integer positions; dictionaries expose operations that accept keys.

---

# DTCC Student Information System

A direct-address array could use student IDs as indices:

```java
// Conceptual example: studentNames is a String[].
studentNames[700000000] = "John Smith";
studentNames[700000001] = "Jane Doe";
```

- These indices require at least 700,000,002 array slots.
- A map lets us store entries for the IDs that are present.

> ***Indexed access is O(1)***, but most slots might be unused.

---

# Dictionary Implementations

The same operations can be supported by different storage structures.

| Implementation | Finding a key | Storage consideration |
|---|---|---|
| Unsorted array | Scan entries | Capacity and resizing |
| Unsorted linked list | Traverse nodes | Links stored with each node |
| Hash table | Use a hash function | Collisions and unused capacity |

Next lecture: what is a hash table and how can a hash table improve average lookup time?

---

# Summary

- A dictionary associates unique keys with values; values may repeat.
- Core operations insert/update, remove, and search by key.
- Arrays and linked lists can implement dictionaries, but key lookup may require a scan.
