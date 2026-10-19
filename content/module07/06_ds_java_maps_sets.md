# Java Maps and Sets

---

# Overview

- Use Map and HashMap to store key-value pairs.
- Insert, update, retrieve, and remove entries.
- Explore map views and the Set interface.
- Connect Java library operations to the dictionary ADT.

---

# From Our Implementations to java.util

- We have studied the dictionary ADT and hash-table implementation strategies.
- Java's Map interface provides the operations for working with key-value pairs.
- HashMap is a ready-to-use hash-table implementation.
- We will return to the student-ID example and use library classes to manage the entries.

---

# Java Map and HashMap

```java
import java.util.Map;
import java.util.HashMap;

Map<Integer, String> students = new HashMap<>();
students.put(700000000, "John Smith");
students.put(700000001, "Jane Doe");
```

- Map<K, V> is the interface; HashMap<K, V> is one implementation.
- Integer is the key type; String is the value type.
- Generics use reference types, so we use Integer rather than int.

<!-- footer -->
https://docs.oracle.com/javase/8/docs/api/java/util/Map.html

https://docs.oracle.com/javase/8/docs/api/java/util/HashMap.html

---

# Operations in Java

```java
students.put(700000001, "Jane Smith"); // Replace this key's value.
String name = students.get(700000001); // "Jane Smith"
boolean found = students.containsKey(700000001); // true
String removed = students.remove(700000000); // "John Smith"
```

- put returns the previous value, or null if there was no mapping.
- get and remove return null for a missing key.
- A stored null value can make get ambiguous; containsKey checks whether the key exists.

---

# Other Helpful Map Operations

| Method | Purpose |
|---|---|
| size(), isEmpty() | Check the number of entries |
| keySet() | Access the unique keys |
| values() | Access the values, which may repeat |
| entrySet() | Access key-value pairs |
| forEach(...) | Perform an action on each entry |

Also available: putAll(...) copies mappings; replaceAll(...) updates values.

<!-- footer -->
https://docs.oracle.com/javase/8/docs/api/java/util/Map.html

---

# Set Interface

A map's keys form a set because keys are unique.

```java
java.util.Set<Integer> ids = students.keySet();
Integer[] idArray = ids.toArray(new Integer[0]);
```

- keySet() returns a view backed by the map.
- Changes to the map are reflected in the view.
- toArray(...) creates a separate array containing the current keys.

<!-- footer -->
https://docs.oracle.com/javase/8/docs/api/java/util/Set.html

---

# What Is a Set?

- A collection that contains no duplicate elements.
- The Set interface does not guarantee an iteration order.
- Specific implementations may provide ordering guarantees.

For a map:

- Two entries cannot have equal keys.
- Different keys may have equal values.

Example: two different student IDs may both map to "Alex Lee".

---

# Summary

- Map defines key-value operations; HashMap is one implementation.
- put inserts or updates; get retrieves; remove deletes an entry.
- containsKey distinguishes a missing key from a stored null value.
- Keys are unique, while values may repeat.
- keySet(), values(), and entrySet() provide views of the map's contents.
- A Set contains no duplicate elements; ordering depends on its implementation.
