# Graph Traversal and Shortest Paths

---

# Overview

- Trace breadth-first and depth-first search
- Connect queues and stacks to traversal order
- Distinguish traversal paths from weighted shortest paths
- Explore Dijkstra distance updates

---

# DFS and BFS

- Breadth-first search (BFS) explores vertices in order of distance from the start, measured in edges.
- Depth-first search (DFS) follows one branch as far as it can before backtracking.
- Both track discovered vertices to handle cycles and converging paths.

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

1. Mark the start vertex as discovered and enqueue it.
2. Dequeue a vertex and examine its outgoing neighbors.
3. For each undiscovered neighbor, mark it as discovered and enqueue it.
4. Repeat until the queue is empty. This visits every vertex reachable from the start.

Marking a vertex when it enters the queue keeps two neighbors from enqueueing it twice.

---

# BFS uses a queue!

- First in, first out (FIFO) processes vertices in discovery order.
- If `A` has neighbors `B` and `C`, and `B` leads to `D`, the queue processes `C` before `D`.
- With neighbors examined in that order, BFS visits `A, B, C, D`.

---

# DFS

- Follow an undiscovered neighbor, then continue from that neighbor.
- When the current vertex has no undiscovered neighbors left, backtrack to the previous vertex.
- On the same graph, DFS can visit `A, B, D, C` by following `B`'s branch before returning to `C`.

---

# DFS uses a STACK!

- A stack follows last in, first out (LIFO) order.
- Recursive DFS uses the call stack. When a call finishes, execution resumes at the previous vertex.
- Iterative DFS can use an explicit stack. The order in which neighbors are pushed can change the visit order.

---

# Traversing cycles and disconnected graphs

- In `A -> B -> C -> A`, mark each vertex when first discovered. When examining `C -> A`, the search skips `A` because it is already discovered.
- From one source, BFS and DFS visit only the vertices reachable from it.
- To traverse an entire graph, scan its vertices and start a new search at each undiscovered vertex. Keep the same discovered set across searches.
- In an undirected graph, each new search visits one connected component.

---

# Reconstructing a path

- When a vertex is first discovered, record the vertex that led to it as its predecessor.
- To recover a path, follow predecessors backward from the destination to the source, then reverse the sequence.
- If the search finishes before discovering the destination, it is unreachable from the source.

---

# DFS and BFS in a weighted graph

- Both DFS and BFS can find a path between two points
- In an unweighted graph, BFS finds a path with the fewest edges.
- In a weighted graph, a path with more edges can have lower total cost.
- If `A → C` costs 9 and `A → B → C` costs 2 + 3, the two-edge path has lower cost.

---

# Dijkstra’s Algorithm

- Finds shortest paths from one source in a graph with nonnegative edge weights.
- Starts with distance 0 for the source and infinity for every other vertex.
- Records a predecessor each time a better path to a vertex is found.

---

# Dijkstra's algorithm

1. Choose the unsettled vertex with the smallest tentative distance. Its distance is now final because edge weights are nonnegative.
2. Relax its outgoing edges. For `u -> v`, compare `distance[u] + weight(u, v)` with `distance[v]`. If the candidate is smaller, update the distance and set `u` as `v`'s predecessor.
3. Repeat until no reachable unsettled vertex remains. Unreachable vertices keep distance infinity.

---

# Relaxing an edge

Using the weighted example, start at `A`.

1. Processing `A` gives tentative distances of 2 to `B` and 9 to `C`.
2. Process `B` next because its tentative distance is smaller.
3. The route through `B` costs 2 + 3 = 5 to reach `C`. Update `C`'s distance to 5 and its predecessor to `B`.

---

# Time Complexity

- BFS and DFS with adjacency lists take O(V + E) in the worst case.
- With an adjacency matrix, BFS and DFS can take O(V²) because each processed vertex requires scanning a row.
- Dijkstra with adjacency lists and a binary-heap priority queue takes O((V + E) log V).

---

# Summary

- BFS explores nearby vertices first using a queue
- DFS explores a branch before backtracking using a stack or recursion
- Visited tracking prevents repeatedly processing vertices
- BFS finds shortest paths by edge count in unweighted graphs
- Dijkstra uses distance updates for graphs with nonnegative edge weights
