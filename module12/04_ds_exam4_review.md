# CIS 211 Exam 4

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
- Less emphasis on code this exam!
- BST implementation
- Comparable interface
- adjacency matrix and list only (no edge list)
- No code for traversal algorithms

---

# Topics

- Arrays vs linked lists!!!
- Recursion
- Sorting
- Trees
- Definitions
- Leaf, depth/height, root, child, parent, etc.
- Binary Trees
- Binary Search Trees
- How to insert/search
- Tree traversals
- inorder, preorder, postorder

---

# Recursion

- Why it’s used
- Pros/cons

---

# Sorting algorithms

- Insertion/bubble sort
- Divide & conquer algorithms
- Big O and how runtime is affected by divide and conquer method
- Quicksort
- Pivot and its importance
- Mergesort
- Pros/cons
- Non-comparison sort
- Radix sort
- Limitations of non-comparison sorts
- Big O runtime efficiency

---

# This is a … (select all that apply)

- tree
- binary tree
- binary search tree
- max heap
- min heap
- AVL tree

[Diagram showing values 5, 2, 3]

---

# This is a … (select all that apply)

- tree
- binary tree
- binary search tree
- max heap
- min heap
- AVL tree

[Diagram showing values 5, 2, 3]

---

# What is the order of nodes visited using preorder/postorder/inorder of this BST?

![bst-example](images/bst-example.png)

---

# Tree Efficiency and Variants

- Efficiency, especially related to height/depth
- AVL, balance factor, rotating
- Heaps (min/max)
- heapify function
- why they’re typically implemented using arrays (random access is important for heaps, complete tree definition)
- Know difference/definitions of each kind of tree
- Binary Tree, Binary Search Tree, AVL Tree, Heap

---

# In this AVL tree, what would happen if the node 75 was inserted?

![avl-tree](images/avl-tree.png)

---

# In this AVL tree, what would happen if the node 100 was inserted?

![avl-tree](images/avl-tree.png)

---

# In this max heap, what would happen if the value 99 was inserted?

![max-heap](images/max-heap.png)

---

# Graphs

- Weighted/unweighted
- Directed/undirected
- Implementations, pros/cons:
  - Adjacency matrix
  - Adjacency list
  - Edge list
- How would you check if a neighbor exists for a specific node in an adjacency matrix/list?
- How Map ADT is used to support implementation of graphs
- related to generics and how each object is mapped to a spot in an array

---

# Graph Efficiency and Algorithms

- Efficiency related to random access, space efficiency (sparse/dense)
- Graph algorithms
- DFS
- BFS
- Shortest path for unweighted graphs only
- Iterative
- Iterative solution of DFS uses a stack, BFS uses a queue
- Greedy algorithms
- Limitations

---

# This implementation could be for a…

```java
boolean[][] graph;
```

A: Undirected, unweighted graph

B: Directed, unweighted graph

C: Undirected, weighted graph

D: Directed, weighted graph

---

# This implementation could be for a…

```java
boolean[][] graph;
```

- MUST BE UNWEIGHTED, because Boolean can only say yes/no for edge existence
- A: Undirected, unweighted graph
- B: Directed, unweighted graph

---

# This implementation could be for a…

```java
int[][] graph;
```

A: Undirected, unweighted graph

B: Directed, unweighted graph

C: Undirected, weighted graph

D: Directed, weighted graph

---

# This implementation could be for a…

```java
int[][] graph;
```

- int can represent 0 and 1 (unweighted), but also a value for weight
- A: Undirected, unweighted graph
- B: Directed, unweighted graph
- C: Undirected, weighted graph
- D: Directed, weighted graph

---

# This implementation could be for a…

```java
LinkedList<T>[] graph;
```

A: Undirected, unweighted graph

B: Directed, unweighted graph

C: Undirected, weighted graph

D: Directed, weighted graph

---

# This implementation could be for a…

```java
LinkedList<T>[] graph;
```

- A: Undirected, unweighted graph
- B: Directed, unweighted graph

---

# This implementation could be for a…

```java
Map<T, List<T>> map;
```

A: Undirected, unweighted graph

B: Directed, unweighted graph

C: Undirected, weighted graph

D: Directed, weighted graph

---

# This implementation could be for a…

```java
Map<T, List<T>> map;
```

- No weights!!! But can do generic mappings
- A: Undirected, unweighted graph
- B: Directed, unweighted graph

---

# Arrays and Linked Lists

Pros?

Cons?
