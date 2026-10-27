# Binary Trees and Binary Search Trees

---

# Overview

- Distinguish binary trees from search trees
- Relate search cost to tree height
- Apply the binary search tree ordering rules

---

# Binary Trees

---

# Restrictions…

Each node can have at most 2 children (0, 1, or 2)

---

# Recursive definition

- Every subtree of a binary tree is a binary tree

---

# Why do these things exist?

- Efficiency
- Don’t have to traverse all nodes
- O(log n) traversal/search
- Depending on height of tree

---

# Tree Traversal

- The longest path for any traversal maxes out at the height of the tree
- However, what if the item you’re looking for is in a different path?
- In other words, what if you took a wrong turn?
- Then you’d need to go back (backtrack) and traverse down a different path…
- Could be very inefficient
- So… let’s restrict the binary tree even more!

---

# Binary Search Tree (BST)

Delaware Technical Community College

---

# Why?

Facilitates Binary Searching

Storage that is always “sorted”

Splits up some of the work involved in retrieval of data

- Sorts as data is inserted
- Intuitive binary search retrieval

---

# Pros and cons

- Always think about what we’re giving up and what we’re gaining…
- What is the “expensive” part of using a BST?
- Why are we willing to pay this price?
- What’s the alternative?
- What does sorting look like in general?

---

# Basics

- The left subtree of a node contains only nodes with keys lesser than the node’s key.
- The right subtree of a node contains only nodes with keys greater than the node’s key.
- The left and right subtree each must also be a binary search tree.

---

# Summary

- Binary tree nodes have at most two children
- A binary tree alone does not guarantee efficient search
- BST ordering directs a search toward one subtree
- Search follows tree height: balanced trees offer shorter paths
- Insertion and retrieval involve tradeoffs in maintaining structure
