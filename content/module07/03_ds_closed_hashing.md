# Closed Hashing and Probing

---

# Overview

- Collisions and key equality
- Expected and amortized operation costs
- Collision resolution through probing
- Clustering and storage characteristics
- Quadratic probing and double hashing

---

# Equal Hash Codes Do Not Prove Equality

```java
String a = "FB";
String b = "Ea";
// a.equals(b) is false.
// Both strings have hashCode() == 2236.
```

- Unequal keys are allowed to share a hash code.
- Compare keys using equals() after locating a candidate entry.
- Avoid modifying fields used by equals()/hashCode() while a key is stored.

<!-- footer -->
https://docs.oracle.com/javase/8/docs/api/java/lang/Object.html#hashCode--

---

# Collisions

A table collision occurs when different keys map to the same array index.

- Equal hash codes produce the same index in our example.
- Different hash codes can also produce the same index.
- With table size 11: 15 % 11 = 4 and 26 % 11 = 4.
- More possible keys than slots means collisions cannot always be avoided.

Good distribution reduces collisions; it does not eliminate them.

---

# Efficiency

Let n be the number of stored entries.

| Implementation | Lookup | Insert/update | Remove |
|---|---|---|---|
| Hash table, expected | O(1) | O(1) amortized | O(1) |
| Hash table, worst case | O(n) | O(n) | O(n) |
| Self-balancing search tree, worst case | O(log n) | O(log n) | O(log n) |
| Unsorted key-value list, worst case | O(n) | O(n) | O(n) |

Hash-table estimates assume good distribution and controlled load; hashing and key comparisons are treated as constant cost.

List insertion/update includes checking whether the key already exists.

---

# What Does O(1) Mean Here?

- Expected O(1): the expected number of entries examined stays bounded as n grows, under suitable hashing and load assumptions.
- Amortized O(1) insertion: occasional resizing is spread across many insertions.
- Neither claim guarantees that every operation takes the same time.
- Hashing a string may itself take O(L), where L is its length.

Question: How can one insertion cost O(n) while a sequence of insertions averages O(1) each?

---

# Review: Collisions and Efficiency

- With table size 11, where do hash codes 15, 26, and -7 map using floorMod?
- If two keys have the same hash code, must equals() return true?
- Does a prime table size guarantee that collisions disappear?
- How can an occasional O(n) resize fit with amortized O(1) insertion?

---

# Closed Hashing (probing)

![Closed hashing resolving collisions with linear probing](images/closed-hashing-linear-probing.png)

---

# Closed Hashing (probing)

If a collision occurs, probe for the next open location.

---

# Downsides…

- Clustering

---

# Closed Hashing Characteristics

- Fixed size
- Predictable memory usage

---

# Other possible strategies…

- Quadratic probing
- Double hashing

---

# Summary

- Closed hashing resolves collisions by probing within the table.
- Clustering can affect performance.
- Alternative probing strategies include quadratic probing and double hashing.
- Equal hash codes do not prove that keys are equal.
- Expected costs rely on hashing and load assumptions; amortized costs spread occasional resizing across many insertions.
