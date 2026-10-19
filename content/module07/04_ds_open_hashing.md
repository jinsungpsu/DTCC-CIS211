# Open Hashing and Separate Chaining

---

# Overview

- Explain buckets and separate chaining.
- Trace insertion, search, updates, and deletion.
- Interpret load factor and uneven bucket sizes.
- Explain resizing and rehashing with a worked example.
- Compare chaining with closed hashing.

---

# Dealing with Collisions

Open hashing stores colliding entries in a chain associated with their array index.

<!-- image bg="#ffffff" -->
![Open hashing resolving collisions with separate chaining](images/open-hashing-separate-chaining.png)

The array identifies a bucket; the bucket leads to its entries.

---

# Open Hashing: Separate Chaining

- The table is an array of **buckets**.
- Each bucket can hold several entries, commonly in a linked list.
- Keys mapping to the same index go into the same bucket.
- Each entry stores both its key and its associated value.
- Empty buckets may be represented by null or an empty list.

Here, **open hashing** means separate chaining; **open addressing** means the closed-hashing strategy from the previous lecture.

---

# Same Keys, Different Collision Strategy

Use the same first-letter hash and table size 10:

```java
int index = key.charAt(0) % 10;
```

| Key | Starting index | Bucket |
|---|---|---|
| Apple | 65 % 10 = 5 | 5 |
| Apricot | 65 % 10 = 5 | 5 |
| Avocado | 65 % 10 = 5 | 5 |
| Banana | 66 % 10 = 6 | 6 |
| Blueberry | 66 % 10 = 6 | 6 |
| Blackberry | 66 % 10 = 6 | 6 |

There is no need to probe neighboring array slots.

---

# What Does the Table Look Like?

Assume we append entries in insertion order for this example.

```text
Index   Chain of entries (keys shown)
0       empty
1       empty
2       empty
3       empty
4       empty
5       Apple -> Apricot -> Avocado
6       Banana -> Blueberry -> Blackberry
7       empty
8       empty
9       empty
```

The arrows are linked-list references. Each named entry also contains its value.

---

# Inserting or Updating an Entry

1. Hash the key and calculate its bucket index.
2. Search that bucket for an equal key.
3. If found, replace its value.
4. Otherwise, add a new entry to that bucket and increment the entry count.

- Updating Apricot changes the entry already in bucket 5.
- Adding Almond creates another entry in bucket 5.
- A head insertion is O(1), but checking for an existing key still requires a bucket search.

Appending is only our illustration convention; other implementations may insert at the head.

---

# Searching Within a Bucket

Find Blueberry using 66 % 10 = 6.

| Entry examined in bucket 6 | Result |
|---|---|
| Banana | Different key; continue |
| Blueberry | Equal key; return its value |

- Compare keys using equals(), not just hash codes.
- Only bucket 6 needs to be searched.
- A good hash function keeps expected bucket searches short.

---

# Searching for a Missing Key

Find Bilberry, which also maps to bucket 6.

1. Compare with Banana.
2. Compare with Blueberry.
3. Compare with Blackberry.
4. Reach the end of the chain: the key is absent.

If the selected bucket is empty, report absence immediately.

Unlike probing, the stopping point is the end of the bucket's chain, rather than an empty slot elsewhere in the array.

---

# Deletion in a Chain

Remove Blueberry from bucket 6:

```text
Before: Banana -> Blueberry -> Blackberry
After:  Banana -> Blackberry
```

- Hash the key, locate its node, and unlink it.
- Removing a head node requires updating the bucket's head reference.
- Decrement the entry count only if an entry was removed.
- Other entries remain reachable through the chain; no tombstone is needed.

Finding the node takes O(b) for a chain of length b. Once its predecessor is known, unlinking a singly linked node takes O(1).

---

# Why No Tombstones?

- A chained search follows node references within one bucket.
- Unlinking a node reconnects the remaining chain.
- An empty array bucket does not interrupt a search for another bucket's entries.

With probing, removal must preserve a path through array slots using tombstones or a repair strategy. With chaining, ordinary linked-list removal preserves reachability.

---

# Load Factor

Let n be the number of active entries and m be the number of buckets.

![Load factor equals the number of elements divided by hash table capacity](images/hash-table-load-factor-formula.png)

For our example: **6 / 10 = 0.60**.

In a chained table, load factor is the average number of entries per bucket, including empty buckets.

---

# Average Does Not Mean Evenly Distributed

Our table has load factor 0.60, but:

- Bucket 5 contains 3 entries.
- Bucket 6 contains 3 entries.
- The other 8 buckets are empty.

The nonempty chains are longer than the average suggests. Load factor alone does not tell us whether a hash function distributes keys well.

---

# Can Load Factor Exceed 1?

Yes: linked entries are not limited to one entry per array slot.

- 15 entries in 10 buckets gives **15 / 10 = 1.5**.
- A bucket can grow even when every bucket is already nonempty.
- Longer chains usually mean more key comparisons.
- More entries still require memory for nodes and their links.

For closed hashing, active entries cannot outnumber array slots. Chaining has no such one-entry-per-slot restriction.

---

# Choosing a Resize Threshold

- Lower thresholds use more buckets to keep expected chains shorter.
- Higher thresholds save bucket-array space but allow longer expected chains.
- There is no single ideal threshold for every implementation.
- For a teaching example, we could resize when adding an entry would make n / m exceed 0.75.

With 10 buckets, 7 entries fit below that chosen threshold; the 8th would trigger growth. Chaining can support thresholds above 1 if that tradeoff is acceptable.

---

# Rehashing

A resize changes the number of buckets, so existing entries may belong at different indices.

- Allocate a new bucket array.
- Recalculate the bucket index of every entry using the new capacity.
- Rebuild the chains in the new array.
- Switch the table to the new array.

Copying each old chain to the same array index is generally incorrect.

---

# Rehashing: From 10 to 20 Buckets

Keep the same first-character hash codes; change the modulus.

| Keys | Hash code | Old index: % 10 | New index: % 20 |
|---|---|---|---|
| Apple, Apricot, Avocado | 65 | 5 | 5 |
| Banana, Blueberry, Blackberry | 66 | 6 | 6 |
| Kiwi | 75 | 5 | 15 |

- Kiwi shares bucket 5 with the A keys before resizing, but moves to 15 afterward.
- The A keys still share a bucket: resizing cannot separate identical hash codes.
- With these 7 entries, load factor falls from 0.70 to 0.35.

This is a resizing demonstration, independent of the chosen resize trigger.

---

# What Gets Recomputed?

```java
int hash = key.hashCode();
int index = Math.floorMod(hash, newCapacity);
```

- The unchanged key can keep its hash code.
- Its bucket index must be calculated using the new capacity.
- An implementation may recompute hash codes or reuse cached ones.
- Moving entries must preserve keys, values, and the entry count.

Our fruit example uses character codes instead of Java String.hashCode().

---

# Efficiency of Separate Chaining

Let b be the length of the selected chain.

| Operation | Work in the selected bucket |
|---|---|
| Search | Compare up to b keys |
| Insert/update | Check up to b keys, then update or link an entry |
| Remove | Find the key, then unlink its entry |

With good distribution, expected work is O(1 + n / m), treating hashing and key comparisons as constant cost. Keeping load factor bounded supports expected O(1) operations.

---

# Resizing and Worst Cases

- Rebuilding a well-distributed table takes expected O(n + m) work for n entries and m new buckets.
- With geometrically growing capacity and bounded load, insertion can be expected amortized O(1).
- A single insertion that triggers rebuilding can still be expensive.
- If all keys land in one linked chain, search, insert/update, and removal can take O(n).

Increasing capacity helps with load; it does not fix a hash function that gives every key the same hash code.

---

# Chaining vs. Probing

| Consideration | Separate chaining | Closed hashing / probing |
|---|---|---|
| Collision storage | Entries in the same bucket's chain | Another slot in the array |
| Search | Traverse one bucket | Follow a probe sequence |
| Deletion | Unlink an entry | Tombstone or repair strategy |
| Active load factor | Can exceed 1 | Cannot exceed 1 |
| Memory | Bucket array plus node/link overhead | Array slots plus state metadata |

Neither is always best. Distribution, load, memory overhead, and access patterns affect the choice.

---

# Planning Table Size

Estimate a bucket count from the expected entry count and target load factor:

```text
buckets = ceil(expectedEntries / targetLoadFactor)
```

For 30 expected entries and a target of 0.75: **ceil(30 / 0.75) = 40 buckets**.

The target is a design choice. There is no universal rule that the array must be approximately 1.3 times the entry count.

---

# Resources

- https://www.cs.cornell.edu/courses/cs3110/2014fa/lectures/13/lec13.html
- https://www.cs.cornell.edu/courses/cs2112/2014fa/lectures/lecture.html?id=hashtables

---

# Summary

- Separate chaining stores entries in buckets, commonly as linked lists.
- Insert, search, update, and remove operate within the key's bucket.
- Unlinking entries preserves search paths without tombstones.
- Load factor measures average bucket length and can exceed 1.
- Rehashing recalculates bucket indices when capacity changes.
- Good distribution and controlled load keep expected chains short.

Next lecture: connect these ideas to an implementation sketch and collection iteration.
