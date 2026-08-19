# CIS 211 Exam 3

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
- Specific code related
- Pseudocode

---

# Circular Arrays DLL, Hash Table Dictionary

Same types of questions as exams 1 and 2

---

# Map, Hash Table

- Hash Table runtime efficiency

---

# Hash function

- Specifically using a string to create a hash function
- Collisions
- Effect of array size on collisions
- Why array/random access is important

---

# Collision resolution

- Closed hashing/linear probing
- Pros?
- Cons?
- Open hashing/separate chaining
- Pros?
- Cons?

---

# Hash Functions

```java
private int hash(K key) {
    String str = key.toString();
    int sum = 0;
    for (int i = 0; i < 2; i++) {
        sum += str.charAt(i);
    }
    return sum % table.length;
}
```

---

# Will it be a collision? table size = 5

- Which of these keys will result in collisions?
- "HI"
- "BE"
- "JK"
- "CAB"
- "DAB"
- "DAD"
- "BAG"

| Decimal | Symbol |
|---|---|
|65|A|
|66|B|
|67|C|
|68|D|
|69|E|
|70|F|
|71|G|
|72|H|
|73|I|
|74|J|
|75|K|

---

# Will it be a collision? table size = 10

- Which of these keys will result in collisions?
- "HI"
- "BE"
- "JK"
- "CAB"
- "DAB"
- "DAD"
- "BAG"

| Decimal | Symbol |
|---|---|
|65|A|
|66|B|
|67|C|
|68|D|
|69|E|
|70|F|
|71|G|
|72|H|
|73|I|
|74|J|
|75|K|

---

# Hypothetical

- How could you increase the number of collisions?
- Decrease?

```java
private int hash(K key) {
    String str = key.toString();
    int sum = 0;
    for (int i = 0; i < 2; i++) {
        sum += str.charAt(i);
    }
    return sum % table.length;
}
```

---

# Open Hashing Code

```java
public class HashTable<K, V> {
    private LinkedList<Entry<K, V>>[] table;
    private int size;
    private static class Entry<K, V> {
        K key;
        V value;
    }
}
```

---

# What's missing?

```java
public void put(K key, V value) {
    int index = hash(key);
    if (table[index] == null) {
        table[index] = new LinkedList<>();
    }
    for (Entry<K, V> entry : table[index]) {
        if (entry.key.equals(key)) {
            entry.value = value;
            return;
        }
    }
    table[index].add(new Entry<>(key, value));
    size++;
}
```

---

# Closed Hashing

```java
public class ClosedHashTable<K, V> {
    private Entry<K, V>[] table;
    private int size;
}
```
