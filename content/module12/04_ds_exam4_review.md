# CIS 211 Exam 4 Review

---

# How to Prepare

- Review the main concepts and trade-offs for each topic.
- Practice tracing code, diagrams, and algorithm behavior.
- Practice writing short methods or pseudocode when appropriate, and explain your reasoning.
- The exam has less emphasis on writing code than earlier exams; traversal algorithm code is not required.
- The practice questions below are examples for studying; they are not exam questions.

---

# Assessment Policies

This assessment is closed resource (no notes, PowerPoint, textbook, internet, etc.). If you open another internet browser or tab, it will be considered cheating. You may not leave the testing area for any reason. If you have any extenuating circumstances that may require any exceptions, please let the instructor/proctor know as soon as you can.

This assessment MUST be completed using D2L on a lab computer during the scheduled time and location; you may not use your own device or take this assessment at a different location without prior approval.

---

# Exam Format

- No IntelliJ; be prepared to reason from concepts, diagrams, and short code examples.
- Expect a mix of multiple choice, select-all-that-apply, conceptual, and written-response questions.
- There is less emphasis on writing code than on previous exams.
- You are not expected to write traversal algorithm code.

---

# Topics

- Arrays and linked lists
- Recursion
- Sorting:
  - Insertion sort and bubble sort
  - Divide and conquer
  - Quicksort and mergesort
  - Non-comparison sorting and radix sort
- Trees:
  - Tree terminology and binary trees
  - Binary search trees (BSTs)
  - Traversals
  - AVL trees and balance
  - Binary heaps
- Graphs:
  - Directed/undirected and weighted/unweighted graphs
  - Adjacency matrices and adjacency lists
  - Maps and graph representations
  - BFS, DFS, and shortest paths in unweighted graphs

---

# Arrays and Linked Lists

| Arrays | Linked Lists |
|------|------|
| Elements are stored in contiguous memory | Nodes can be stored in different locations |
| Fixed length; capacity is allocated in advance | Can grow and shrink as nodes are added or removed |
| Fast indexed access: **O(1)** | Finding an item by position requires traversal: **O(n)** |
| No per-element link references | Each node uses extra memory for one or more references |

- Arrays are useful when fast indexed access and predictable capacity are important.
- Linked lists are useful when the collection changes size often and updates at known nodes are needed.
- Neither structure is best for every workload; consider access patterns and memory needs.

---

# Sample: Choose a Structure

A program frequently reads items by index, and the number of items is known in advance. Which structure is a natural fit, and what is one trade-off?

<div class="fragment">

### One Possible Answer

An **array** provides fast indexed access and avoids per-node link references. Its size is fixed, so the program must allocate enough capacity in advance.

</div>

---

# Recursion

- A recursive method solves a problem by calling itself on a smaller or simpler input.
- A **base case** stops the recursion.
- Each recursive call should make progress toward a base case.
- Calls are stored in the call stack; many nested calls use additional memory and can cause stack overflow.
- Recursion can make naturally nested problems easier to express, but it is not automatically faster or more memory-efficient than iteration.

---

# Sample: Trace a Recursive Method

Consider a method that returns `1` when `n` is `0`; otherwise, it returns `n` multiplied by the result of calling itself with `n - 1`. What value does it return for `n = 4`?

<div class="fragment">

### Answer

It returns **24**:

`4 × 3 × 2 × 1 × 1 = 24`

The call reaches the base case at `n = 0`, then returns through the pending calls.

</div>

---

# Sorting Overview

| Algorithm | Main Idea | Typical Runtime | Important Trade-off |
|------|------|------|------|
| Insertion sort | Insert each item into the sorted portion | O(n²) average/worst | Simple; can be effective on small or nearly sorted inputs |
| Bubble sort | Repeatedly compare and swap neighboring items | O(n²) average/worst | Simple, but often inefficient on large inputs |
| Mergesort | Split, sort each half, then merge | O(n log n) | Requires extra O(n) storage for the usual array implementation |
| Quicksort | Partition around a pivot, then sort partitions | O(n log n) average; O(n²) worst | Performance depends on how balanced the partitions are |
| Radix sort | Sort by digit or component, one position at a time | Depends on item count and digit count | Non-comparison sort; only applies to suitable key formats |

---

# Divide and Conquer

- Divide the input into smaller subproblems.
- Solve the subproblems, often recursively.
- Combine their results into a complete answer.
- Mergesort and quicksort use this approach.
- Repeatedly splitting into balanced parts often leads to about **O(log n)** levels of work.
- The work performed across each level matters too; divide and conquer does not automatically guarantee O(n log n).

---

# Sample: Identify Divide and Conquer

Which approach is divide and conquer?

- Repeatedly compare neighboring items and swap them if needed.
- Split a collection into smaller parts, solve those parts, and combine the results.
- Process each number's digits from least significant to most significant.

<div class="fragment">

### Answer

The second approach describes **divide and conquer**. Mergesort and quicksort are examples.

</div>

---

# Mergesort and Quicksort

**Mergesort**

- Splits the input into smaller parts, sorts them, then merges sorted parts.
- Has O(n log n) time in typical and worst cases.
- The usual array implementation requires O(n) additional storage.

**Quicksort**

- Chooses a pivot and partitions values around it.
- Recursively sorts the partitions.
- Balanced partitions lead to about O(n log n) work.
- Repeatedly poor partitions can lead to O(n²) work.

---

# Sample: Compare Sorting Choices

You need predictable O(n log n) worst-case time for an array sort and can use extra storage. Which algorithm is a reasonable choice, and what is its main space trade-off?

<div class="fragment">

### Answer

**Mergesort** is a reasonable choice. Its usual array implementation uses O(n) extra storage.

</div>

---

# Non-Comparison Sorting

- Comparison sorts determine order by comparing values.
- Non-comparison sorts use properties of the keys, such as digits or a restricted range.
- Radix sort processes keys by individual digits or components, using a stable sort for each position.
- Its runtime depends on both the number of items and the number of positions processed.
- Radix sort is not suitable for arbitrary data without a way to represent and process its keys.

---

# Sample: When Radix Sort Fits

What kind of input is a good candidate for radix sort? Name one reason it cannot be used as a general replacement for comparison sorts.

<div class="fragment">

### One Possible Answer

Fixed-format values such as nonnegative integers with a limited number of digits can be a good fit. Arbitrary objects may not have a meaningful digit-by-digit representation, and performance depends on key length and representation.

</div>

---

# Tree Vocabulary

- **Root:** the top node; it has no parent.
- **Parent / child:** directly connected nodes, with the parent closer to the root.
- **Leaf:** a node with no children.
- **Depth:** the number of edges from the root to a node.
- **Height of a node:** the number of edges on the longest path from that node down to a leaf.
- **Height of a tree:** the height of its root.
- **Binary tree:** each node has at most two children.

Do not confuse a binary tree with a binary search tree: a binary tree alone does not impose an ordering on its values.

---

# Recognizing Tree Types

- A **binary search tree (BST)** is a binary tree ordered so values in the left subtree are smaller and values in the right subtree are larger, according to the tree's comparison rule.
- A **min-heap** is a complete binary tree where each parent is less than or equal to its children.
- A **max-heap** is a complete binary tree where each parent is greater than or equal to its children.
- An **AVL tree** is a self-balancing BST; the heights of the left and right subtrees at each node differ by at most one.
- A structure may meet more than one definition, but each definition has its own rules. Check all required properties.

---

# Sample: Identify a Tree Property

A binary tree has a root value of `18`, with children `11` and `27`. Does this information alone prove that it is a BST, a min-heap, or a max-heap?

<div class="fragment">

### Answer

It is a **binary tree**. These values satisfy the root ordering for both a BST and a min-heap, but the whole tree must be checked to establish those properties. It is not a max-heap because the root is smaller than one of its children.

</div>

---

# Binary Search Trees

- Search by comparing the target with the current node and choosing the left or right subtree.
- Insert by following the same comparisons until an available child position is found.
- For objects, comparisons are commonly provided by `Comparable<T>` and `compareTo`.
- Search and insertion take **O(h)** time, where `h` is the tree height.
- A reasonably balanced BST has height around **O(log n)**.
- A highly skewed BST can have height **O(n)**, making search and insertion **O(n)**.
- Balance matters because it controls tree height and the length of paths to nodes.

---

# Sample: BST Search Path

Insert `18`, `9`, `26`, and `13` into an initially empty BST, in that order. Which nodes are visited when searching for `13`?

<div class="fragment">

### Answer

Visit **18**, then **9**, then **13**:

- `13` is less than `18`, so go left.
- `13` is greater than `9`, so go right.

</div>

---

# BST Traversals

For each node, the traversal order is:

- **Preorder:** node, left subtree, right subtree.
- **Inorder:** left subtree, node, right subtree.
- **Postorder:** left subtree, right subtree, node.

For a BST with distinct values, inorder traversal visits values in sorted order.

---

# Sample: Traversal Order

For a tree with root `18`, left child `9`, and right child `26`, write the preorder, inorder, and postorder sequences.

<div class="fragment">

### Answer

- Preorder: `18, 9, 26`
- Inorder: `9, 18, 26`
- Postorder: `9, 26, 18`

Remember: preorder visits the node first; postorder visits it last.

</div>

---

# AVL Trees

- An AVL tree is a BST that maintains balance after insertions and removals.
- A node's balance factor is based on the heights of its left and right subtrees. The sign convention can vary; know the convention used in class.
- Valid AVL balance factors are typically `-1`, `0`, or `1`.
- After an insertion, check ancestors on the path back toward the root.
- If an ancestor becomes unbalanced, a rotation (or pair of rotations) restores the BST ordering and balance.
- The goal is to keep height O(log n), so search and insertion remain O(log n).

---

# Sample: AVL Insertion Reasoning

After inserting a new value into an AVL tree, what should you check on the path from the inserted node toward the root? Why might a rotation be needed?

<div class="fragment">

### Answer

Check the subtree heights or balance factor at each ancestor. If a node becomes unbalanced, a rotation restores the AVL height condition while preserving the BST ordering.

</div>

---

# Binary Heaps

- A binary heap is a **complete** binary tree.
- In a max-heap, the largest value is at the root; in a min-heap, the smallest value is at the root.
- The heap rule compares parents with their children; it does not require the entire tree to be sorted.
- Insertion places a new item in the next available position, then sifts it up as needed.
- A heapify/sift-down operation moves a value down by comparing it with its children.
- A single sift-up or sift-down takes **O(log n)** in a binary heap.

---

# Why Store a Heap in an Array?

- A complete tree fills each level from left to right, so its array representation has no gaps between occupied positions.
- Array indexing gives fast access to the parent and children of a node.
- With zero-based indexing:

```text
left child  = 2 * index + 1
right child = 2 * index + 2
parent      = (index - 1) / 2
```

- The array representation avoids storing explicit child references in every node.

---

# Sample: Heap or BST?

A complete binary tree has the largest value at its root, and every parent is at least as large as its children. Does this make it a max-heap, a BST, both, or neither?

<div class="fragment">

### Answer

It is a **max-heap**. The heap rule does not impose the left-smaller/right-larger ordering required of a BST.

</div>

---

# Graph Terminology

- **Vertex (node):** an item in the graph.
- **Edge:** a connection between vertices.
- **Directed edge:** has a source and destination; direction matters.
- **Undirected edge:** connects two vertices in both directions.
- **Weighted edge:** has an associated value such as distance or cost.
- **Unweighted edge:** records connection without an edge weight.
- **Sparse graph:** has relatively few edges.
- **Dense graph:** has many edges relative to the possible connections.

---

# Graph Representations

| Representation | Typical Space | Edge Lookup | Notes |
|------|------|------|------|
| Adjacency matrix | O(V²) | O(1) | Convenient for dense graphs and checking a specific pair |
| Adjacency list | O(V + E) | O(degree of source) | Usually more space-efficient for sparse graphs |

- `boolean[][]` records whether an edge exists, so it naturally represents an unweighted graph.
- A numeric matrix such as `double[][]` can store edge weights; a numeric matrix can also encode unweighted edges by using values such as `0` and `1`.
- A list of neighbors such as `Map<T, List<T>>` naturally records unweighted connections. A weighted adjacency list needs to store both each neighbor and its edge weight.
- The representation alone does not determine whether a graph is directed. For an undirected graph, both directions must be represented consistently.

---

# Sample: Choose a Graph Representation

A graph has many vertices but only a few edges. You often need to list the neighbors of a vertex. Which representation is usually more space-efficient, and why?

<div class="fragment">

### Answer

An **adjacency list** is usually more space-efficient for a sparse graph because it stores existing neighbors rather than reserving a matrix entry for every possible pair.

</div>

---

# Maps and Graphs

- A map can associate each vertex label with its list of neighbors.
- This is useful when vertices are generic values rather than integer array indexes.
- To check whether `src` has an edge to `dest` in an adjacency-list map, get the neighbors of `src` and check whether that list contains `dest`.
- For a directed graph, this checks the edge from `src` to `dest`; it does not imply an edge from `dest` to `src`.
- For an undirected graph, the representation should keep both neighbor lists consistent.

---

# Sample: Read an Adjacency List

Suppose a graph map stores `P -> [Q, R]` and `Q -> [R]`. Is there an edge from `P` to `R`? Is there necessarily an edge from `R` to `P`?

<div class="fragment">

### Answer

There is an edge from **P to R** because `R` is in `P`'s neighbor list. There is **not necessarily** an edge from `R` to `P`; that depends on whether the graph is directed and how its edges are represented.

</div>

---

# Breadth-First and Depth-First Search

- Both algorithms track visited vertices to avoid repeatedly processing vertices, especially in graphs with cycles.
- **BFS** explores by distance from the starting vertex and uses a **queue** in its iterative form.
- **DFS** explores one path as far as possible before backtracking; its iterative form uses a **stack**.
- In an unweighted graph, BFS can find a path with the fewest edges from the start to a reachable destination.
- BFS does not generally find a minimum-total-weight path in a weighted graph.

---

# Sample: Select a Search Strategy

You need a path with the fewest edges between two vertices in an unweighted graph. Which search is appropriate? What structure does its iterative form use?

<div class="fragment">

### Answer

Use **BFS**, which uses a **queue** in its iterative form.

</div>

---

# Greedy Algorithms

- A greedy algorithm makes a locally appealing choice at each step.
- Greedy choices can be efficient and can solve some problems optimally.
- A locally best choice does not guarantee a globally optimal result for every problem.
- Before trusting a greedy method, understand the problem conditions that make its choices safe.

---

# Final Study Checklist

- Can you compare array and linked-list access, flexibility, and memory overhead?
- Can you identify recursion's base case, progress, and call-stack cost?
- Can you distinguish comparison sorts from non-comparison sorts?
- Can you explain divide and conquer, mergesort's extra space, and quicksort's pivot trade-off?
- Can you identify a tree's root, leaves, depth, and height?
- Can you distinguish a binary tree, BST, AVL tree, min-heap, and max-heap?
- Can you trace BST insertion, search, and preorder/inorder/postorder?
- Can you explain why BST height affects performance and why AVL rotations are used?
- Can you explain heap order, completeness, array indexing, and sift-up/sift-down?
- Can you compare adjacency matrices and adjacency lists for dense and sparse graphs?
- Can you infer what edge information a graph representation stores?
- Can you explain how BFS and DFS differ and which one finds shortest paths in unweighted graphs?
- Can you explain why a greedy choice may not always produce a globally optimal answer?
