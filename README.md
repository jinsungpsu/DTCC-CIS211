# DTCC CIS211 Slides

Lecture slides for CIS211 built using:

- Markdown (`.md`)
- Reveal.js
- GitHub Pages
- VS Code

The goal is to maintain all lecture content in Markdown while using Reveal.js as the presentation layer.

---

# Repository Structure

```text
DTCC-CIS211-Slides/
│
├── index.html
├── slide.html
│
├── module01/
│   ├── 01_data_structures_intro.md
│   ├── 02_arraylists.md
│
├── module02/
│   ├── 01_linked_lists.md
│
├── images/
│   ├── arrays/
│   ├── linkedlists/
│   └── common/
│
└── README.md
```

---

# Important Files

## index.html

Course home page.

Displays a list of lecture links.

Example:

```html
<a href="./l?deck=module01/01_data_structures_intro.md
    Data Structures Introduction
</a>
```

---

## slide.html

Reusable Reveal.js launcher.

Every lecture uses this file.

Example URL:

```text
slide.html?deck=module01/01_data_structures_intro.md
```

The launcher loads the specified Markdown file and renders it using Reveal.js.

---

# Creating a New Lecture

## Step 1

Create a new Markdown file.

Example:

```text
module02/02_stacks.md
```

---

## Step 2

Add lecture content.

Example:

```markdown
# Stacks

---

# Stack Operations

- Push
- Pop
- Peek

---

# Java Example

```java
Stack<Integer> stack = new Stack<>();

stack.push(5);
stack.push(10);

System.out.println(stack.pop());
```
```

---

## Step 3

Add a link to the lecture in `index.html`.

Example:

```html
./slide.html?deck=module02/02_stacks.md
    Stacks
</a>
```

---

# Slide Separators

Reveal.js treats:

```markdown
---
```

as a new slide.

Example:

```markdown
# Slide 1

---

# Slide 2

---

# Slide 3
```

---

# Headers

Use Markdown headers normally.

```markdown
# Major Heading

## Subheading

### Smaller Heading
```

---

# Bullet Lists

```markdown
- Arrays
- Linked Lists
- Stacks
```

Produces:

```text
• Arrays
• Linked Lists
• Stacks
```

---

# Numbered Lists

```markdown
1. First
2. Second
3. Third
```

---

# Code Blocks

Use fenced code blocks.

Java example: