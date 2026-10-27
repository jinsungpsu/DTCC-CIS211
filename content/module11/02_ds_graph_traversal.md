# Graph Traversal and Shortest Paths

---

# Overview

- Trace breadth-first and depth-first search
- Connect queues and stacks to traversal order
- Distinguish traversal paths from weighted shortest paths
- Explore Dijkstra distance updates

---

# Graph Traversals

---

# DFS and BFS

- Already saw some examples with trees
- BFS - breadth first search
- Traverses closer nodes/neighbors first
- DFS - depth first search
- Traverses as far as possible, then backtracks

---

# BFS

- Visit neighbors/closest nodes first, then starts spreading out
- Great if we expect to find what we’re looking for to be near the starting point
- e.g. a search perimeter for a missing person

<!-- footer -->
https://www.freemaptools.com/blog/2014/10/drawing-concentric-circles-on-a-map/

https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/

---

# BFS Algorithm

Starting from the root, all the nodes at a particular level are visited first and then the nodes of the next level are traversed till all the nodes are visited.

To do this a queue is used. All the adjacent unvisited nodes of the current level are pushed into the queue and the nodes of the current level are marked visited and popped from the queue.

---

# BFS uses a queue!

- Why?
- FIFO
- First in first out facilitates dealing with things that are “close” first

---

# DFS

- Visit farthest nodes first, then backtrack
- Great if we expect to find what we’re looking far from the starting point

---

# DFS uses a STACK!

- Why?
- FILO
- First in last out facilitates dealing with things that are “far” first

---

# Search Algorithms

- In a graph, we can extend that idea to find a path between a source and destination.
- As we traverse the graph, we keep track of the visited nodes in order, then we stop the algorithm once we encounter the destination

---

# DFS and BFS in a weighted graph

- Both DFS and BFS can find a path between two points
- In an unweighted graph, BFS will result in the shortest path found.
- In a weighted graph, BFS CANNOT guarantee the shortest path.

---

# Dijkstra’s Algorithm

- Solves the issue of finding the shortest path in a weighted graph
- Calculate shortest path to each vertex
- Keep track of previous node in the path

---

# Algorithm Overview

- Starting from the source node
- Repeatedly choosing the unvisited vertex with the smallest known distance
- Relaxing its edges
- Marking the vertex as visited

---

# Time Complexity

- BFS: O(V+E)
- DFS: O(V+E)
- Dijkstra: O((V + E) log V)

---

# Summary

- BFS explores nearby vertices first using a queue
- DFS explores a branch before backtracking using a stack or recursion
- Visited tracking prevents repeatedly processing vertices
- BFS finds shortest paths by edge count in unweighted graphs
- Dijkstra uses distance updates for graphs with nonnegative edge weights
