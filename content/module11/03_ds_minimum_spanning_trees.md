# Minimum Spanning Trees and Course Review

---

# Overview

- Distinguish connectivity and cycles
- Compare Kruskal and Prim strategies
- Review ADTs and their underlying implementations

---

# MST (Minimum Spanning Tree)

A spanning tree is a tree-like subgraph of a connected, undirected graph that includes all vertices of the graph.

The minimum spanning tree has the minimum possible weights among all spanning trees.

---

# Connected Graphs and Cycles

- Connected graph: there is a path between every pair of vertices.
- Strongly connected and weakly connected for directed graphs.
- Cycle: path that starts and ends at the same vertex.
- Acyclic graphs contain no cycles.

---

# Creating an MST from a graph - Kruskal’s

- Sort all edges by weight
- Add lowest-weight edges
- Do not create cycles

---

# Creating an MST from a graph - Prim’s

- Start with an arbitrary vertex
- Repeatedly add minimum edge connecting MST to a new vertex
- Continue until all vertices are included

---

# Visualgo - MST

[https://visualgo.net/en/mst?slide=1](https://visualgo.net/en/mst?slide=1)

---

# Semester Summary

## ADTs
- List
- Stack
- Queue
- Deque
- Set
- Map
- Trees (General, Binary, BST, AVL, Heap)
- Graphs

## Implementations
- Array
- SLL
- Circular Array
- DLL
- Circular SLL
- Circular DLL
- Hash Table
- Open hashing
- Closed hashing
- Arrays of Linked Lists

---

# Summary

- A spanning tree connects all vertices without cycles
- An MST minimizes total edge weight in a connected undirected weighted graph
- Kruskal adds low-weight edges while avoiding cycles
- Prim grows a tree by connecting it to a new vertex
- ADTs describe behavior; representations determine implementation tradeoffs
