# ArrayList Review, Interfaces, Generics

---
# Abstract Data Type
By definition, it provides no implementation details

## Java Interface
- An interface in Java is an abstract type used to specify behavior.

```java
interface List {
    ...
}
```

<!-- footer -->
https://www.geeksforgeeks.org/interfaces-in-java/

---
# Uses of Interfaces

- Define a contract without providing implementation details
- Support abstraction by focusing on what an object does
- Enable polymorphism through a common interface type
- Allow a class to implement multiple interfacess can implement multiple interfaces

Another way of thinking about it: 
> An interface is a blue print for a class

---
# Implementing an Interface

- Use the `implements` keyword

```java
class ArrayList implements List {
    ...
}
```

---
# From Previous List Example

- List ADT - **ABSTRACT**
    - No implementation details!
    - **EMPTY** method bodies

```java
interface List {
    public void add(int item);
    public void remove(int item);
    public int size();
}
```

---
# Example of List Implementation

- `implements` tells Java that `ArrayList` follows the `List` interface.
- `ArrayList` must provide an implementation for every method declared in `List`.
- If any required method is missing, the class will not compile.
- This ensures that every `List` implementation provides the behavior defined by the interface.

```java
class ArrayList implements List {
    // must implement all interface methods
}
```

---
# java.util.List

- `List` is a real interface in the `java.util` package.
- It defines operations for working with ordered collections.
- Common implementations of `List` in `java.util`:
  - `ArrayList`
  - `LinkedList`
- Code can use the `List` interface without depending on a specific implementation.

---

# Polymorphism

```java
List<Integer> numList = new ArrayList<>();
List<Integer> numList2 = new LinkedList<>();
```

- `List`, `ArrayList`, and `LinkedList` are real types in the `java.util` package.
- Both variables have the type `List<Integer>`.
- The actual objects are different implementations of `List`.
- This allows code to work with any `List` implementation.
- One implementation can be replaced with another with little or no change to the rest of the code.

---
# Generics

- Generics are **parameterized types**.
- A type parameter acts like a placeholder for a data type.
- The actual type is specified when the class or interface is used.

```java
ArrayList<String> names;
ArrayList<Integer> numbers;
```

---
# Generic Classes

```java
ArrayList<Integer> myNums;
ArrayList<Character> myLetters;
```

- Generics allow classes and interfaces to work with different data types.
- The type inside `< >` specifies what kind of data can be stored.
- `myNums` stores `Integer` objects.
- `myLetters` stores `Character` objects.

---
# Key Idea

> **Generics allow you to write a class or interface once and use it with many different data types.**

```java
ArrayList<Integer> numbers;
ArrayList<String> names;
ArrayList<Double> prices;
```

---
# Why Generics?

1. **Code reuse** - One class can work with many different data types.
2. **Type safety** - Errors can be detected at compile time.

```java
ArrayList<String> names = new ArrayList<>();
names.add("Alice");

// names.add(123);   // Compile-time error
```

---
# Future Type Constraints

```java
class ArrayStack<E extends Comparable<E>> {
}
```

- Generics can restrict what types are allowed.
- `extends Comparable<E>` means the type must be comparable to other objects of the same type.
- This allows methods such as sorting or comparing values.

```java
ArrayStack<Integer> stack = new ArrayStack<>();
```
---

# Type Safety

```java
ArrayList<Integer> numbers = new ArrayList<>();

numbers.add(10);
numbers.add(20);

// numbers.add("Hello");   // Compile-time error
```

- Generics restrict what types can be stored.
- The compiler catches type mismatches before the program runs.
- This helps prevent bugs and makes code more reliable.

---

# Array Implementation of List ADT

> **Note:** This is NOT the java.util.List interface, we're practicing by creating our own version

## Generic List Interface

```java
interface List<T> {
    public void add(T item);
    public void remove(int index);
    public int size();
}
```

---
# Implementation of List Using Array

> **Note:** Again - this is NOT the java.util.ArrayList class, we're practicing by creating our own version

```java
class ArrayList<T> implements List<T> {
    ...
}
```

---

# Demo
> In class demonstration working through examples and code live in class.

---

# java.util.ArrayList

> [java.util.ArrayList Source Code](https://github.com/openjdk/jdk/blob/master/src/java.base/share/classes/java/util/ArrayList.java)

---

# ArrayList Example

Suppose the internal array looks like this:

```text
Index:  0   1   2
Value: [A] [B] [C]
```

The array is full.

---

# Adding to a Full ArrayList

What happens when we execute:

```java
list.add("D");
```

The existing array cannot store another element because it has reached its capacity.

---

## The ArrayList Must:

<!-- column -->

1. Create a larger array
2. Copy all existing elements
3. Add the new element
4. Replace the old array

<!-- column -->

```text
Old Array
[A] [B] [C]

↓

New Array
[A] [B] [C] [D] [ ] [ ]
```
<!-- endcolumns -->

> To the programmer, it looks like the ArrayList grew. Internally, a completely new array was created.

---

# Why Are Arrays Still Fixed Size?

<!-- column -->
The internal storage of an `ArrayList` is still an array.

```java
int[] numbers = new int[3];
```

<!-- column -->
This array has space for exactly 3 elements.

```text
Index:  0   1   2
Value: [ ] [ ] [ ]
```
<!-- endcolumns -->
We cannot change its size later:

```java
// Not legal Java
numbers.resize(10);
```
---
# Important Distinction
<!-- column -->
```text
Array
    Fixed Size

ArrayList
    Uses an Array
    +
    Creates Larger Arrays When Needed
    +
    Copies Existing Data
```
<!-- column -->
- Arrays remain fixed-size data structures.
- The JVM allocates a fixed block of contiguous memory when the array is created.
- An `ArrayList` provides the illusion of resizing by allocating new arrays behind the scenes.

<!-- endcolumns -->

> Arrays never grow. ArrayLists grow by replacing one array with another larger array.
