# Hash Table Implementation and ADT Review

---

# Overview

- An open-hashing implementation sketch
- Java linked-list iterators
- Review of ADTs and their implementations

---

# Possible Implementation of Open Hashing

```java
private LinkedList<Entry>[] table;

class Entry {
    K key;
    V value;
}
```

---

# Iterators in Java

```java
LinkedList<String> cars = new LinkedList<>();
cars.add("Volvo");
cars.add("BMW");
cars.add("Ford");
cars.add("Mazda");

Iterator<String> it = cars.iterator();

while(it.hasNext()) {
    System.out.println(it.next());
}
```

<!-- footer -->
https://www.w3schools.com/java/ref_linkedlist_iterator.asp

https://docs.oracle.com/javase/8/docs/api/java/util/ListIterator.html

---

# Big picture summary so far…

## ADTs
- List
- Stack
- Queue
- Deque
- Set
- Map

## Implementations
- Array
- SLL
- Circular Array
- DLL
- Circular SLL
- Circular DLL
- Hash Table
- Open Hashing
- Closed Hashing


---

# Summary

- Linked lists can hold entries for an open-hashing implementation.
- Iterators provide sequential access to collection elements.
- An ADT describes behavior; implementations provide the underlying storage.
