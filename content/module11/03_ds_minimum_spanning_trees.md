# Minimum Spanning Trees and Course Review

---

# Overview

- Distinguish connectivity and cycles
- Compare Kruskal and Prim strategies
- Review ADTs and their underlying implementations

---

# Minimum spanning trees

- A **spanning tree** uses all the vertices of a connected, undirected graph and enough of its original edges to connect them without cycles.
- A spanning tree on `V` vertices has exactly `V - 1` edges.
- A **minimum spanning tree** (MST) minimizes the sum of the selected edge weights. Ties can produce more than one MST.

---

# Why avoid cycles?

- A tree has exactly one simple path between any pair of vertices.
- Adding an edge between two vertices already connected in a tree creates a cycle.
- Removing one edge from a cycle preserves connectivity because the rest of the cycle supplies another route.
- A disconnected graph has no spanning tree covering all its vertices. A **minimum spanning forest** contains an MST for each connected component.

---

# Kruskal's algorithm

1. Start with every vertex in its own component.
2. Consider edges in increasing weight order. Accept an edge if it joins two different components, then merge those components.
3. Stop after accepting `V - 1` edges in a connected graph. A disjoint-set structure (union-find) can track the components.

---

# Prim's algorithm

1. Start with any vertex.
2. Choose the lightest edge from a vertex already in the growing tree to a vertex outside it.
3. Add the edge and its outside vertex. Repeat until all vertices are included.

---

# MST versus shortest paths

Consider an undirected triangle with weights `A-B = 2`, `B-C = 2`, and `A-C = 3`.

- The MST uses `A-B` and `B-C` and has total edge weight 4.
- The shortest route from `A` to `C` uses the direct edge of weight 3. The route inside the MST costs 4.
- An MST minimizes the total cost of the network. A shortest-path algorithm minimizes the cost of a route.

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
