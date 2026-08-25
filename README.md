# DTCC CIS211 Lecture Slides

Welcome to the CIS211 lecture slide repository.

This site contains lecture materials for:

**CIS211 – Data Structures**

Slides are provided as interactive Reveal.js presentations and are organized by module.

---

## Accessing the Lectures

Start here:

```text
https://jinsungpsu.github.io/DTCC-CIS211/
```

From the home page, select the lecture you would like to view.

---

## Viewing a Lecture

Each lecture opens as an interactive slide deck.

You may navigate using:

### Keyboard

```text
→ Right Arrow    Next slide
← Left Arrow     Previous slide
Space            Next slide
Esc              Slide overview
F                Fullscreen
S                Presenter View (Speaker Notes)
```

### Toolbar

The toolbar appears at the top of the presentation.

```text
☰ All           Return to lecture list
◀ Prev          Previous lecture
Next ▶          Next lecture
☰ All           Table of Contents (slides)
◀ Prev          Previous slide
Next ▶          Next slide
🔍              Search slides
✏️              Toggle Notes Canvas
🖨              Open Print Version (2 slides per page with notes)
⛶              Enter Fullscreen
✕               Exit Fullscreen
```

---

## Searching Within a Lecture

The Search feature lets you quickly find topics in the current lecture.

Examples:

```text
ArrayList
LinkedList
Stack
Queue
Recursion
BinaryTree
```

Search is useful when reviewing material before quizzes, exams, and programming assignments.

---

## Fullscreen Mode

For the best viewing experience:

1. Open a lecture.
2. Click the fullscreen button:

```text
⛶
```

or press:

```text
F
```

Fullscreen mode makes code examples and diagrams easier to read.

To exit fullscreen:

```text
✕
```

or press:

```text
Esc
```

---

## Code Examples

Many lectures contain Java code.

Code blocks include syntax highlighting to make examples easier to read and understand.

Example:

```java
public class Node {
    private int data;
    private Node next;

    public Node(int data) {
        this.data = data;
        this.next = null;
    }
}
```

---

## Mobile Devices

Lectures can be viewed on phones and tablets.

Navigation options:

- Swipe left/right
- Use on-screen controls
- Rotate device to landscape for the best experience

---

## Printing / Saving as PDF

To print or save a lecture as PDF:

1. Open the lecture you want to print
2. Click the print button in the toolbar:

```text
🖨
```

3. This opens the print version in a new tab with:
   - 2 slides per page
   - Notes section below each slide
   - Ruled paper background for notes

4. Use your browser's print dialog to:
   - Print the handout
   - Save as PDF (select "Save as PDF" in the print dialog)

Printing is intended primarily for note-taking and offline review.

---

## Speaker Notes

Most students can ignore this section.

Speaker Notes are intended for instructors presenting the lecture.

Notes are not visible in the normal presentation view.

### Presenter View

Reveal.js includes a special Presenter View that displays:

- Current slide
- Next slide
- Speaker notes
- Presentation timer
- Clock

Presenter View can be opened by pressing:

```text
S
```

while viewing a presentation.

### Typical Classroom Setup

Instructor Screen:

```text
Current Slide
Next Slide
Speaker Notes
Timer
```

Projector Screen:

```text
Slides Only
```

Students see only the presentation.

### Notes in Lecture Source Files

Speaker notes are stored inside lecture Markdown files.

Example:

```markdown
# Linked Lists

Linked lists store elements in nodes.

Note:
Remind students:
- Discuss linked lists vs arrays
- Explain node structure
- Show insertion and deletion
```

Anything following:

```markdown
Note:
```

appears only in Presenter View.

Students never see these notes.

---

## Technical Information

The site is built using:

- Markdown
- Reveal.js
- GitHub Pages
- Centralized Lecture Framework

Lecture content is maintained in Markdown and rendered as interactive presentations.

---

# Writing Lecture Content

This section covers how to create and format lecture slides using Markdown.

## Basic Slide Structure

Each slide is separated by:

```text
---
```

Example:

```markdown
# Slide Title

Content goes here.

---

# Next Slide

More content.
```

---

## Two-Column Layouts

You can create multi-column layouts using the `<!-- column -->` marker.

### Basic Two Columns

```markdown
## Two Columns

<!-- column -->
**Left Column**
- Item 1
- Item 2
- Item 3

<!-- column -->
**Right Column**
1. One
2. Two
3. Three
```

### Three or More Columns

```markdown
## Three Columns

<!-- column -->
Column one content.

<!-- column -->
Column two content.

<!-- column -->
Column three content.
```

### Returning to Full Width

Use `<!-- endcolumns -->` to return to full-width content after a column layout:

```markdown
<!-- column -->
Left column content.

<!-- column -->
Right column content.

<!-- endcolumns -->

This text will span the full width of the slide.
```

### Features

- **Auto-detects** number of columns (2, 3, 4+)
- **Columns scroll** if content is too long
- **Images** automatically scale to fit columns
- **Lists** and **code blocks** work inside columns
- **Responsive** and stacks vertically on mobile
- **Endcolumns** allows return to full-width layout

### Images in Columns

```markdown
<!-- column -->
![Diagram](images/diagram.jpg)

<!-- column -->
- List item 1
- List item 2

<!-- endcolumns -->
Full-width conclusion or summary text.
```

---

## Footers

Add a footer to any slide using the `<!-- footer -->` marker.

### Basic Footer

```markdown
# Slide Title

Content here.

<!-- footer -->
© 2026 | CIS211 | Data Structures
```

### Footer with Links

```markdown
<!-- footer -->
[Course Website](https://example.com) | [GitHub](https://github.com)
```

### Footer Features

- **Centered** at bottom of slide
- **Supports Markdown** (links, bold, italic)
- **Scales** with font settings
- **Auto-spacing** to prevent overlap

---

## Images

Store all images under:

```text
images/
```

Example:

```text
images/linkedlists/node-diagram.png
```

Reference in Markdown:

```markdown
![Node Diagram](images/linkedlists/node-diagram.png)
```

### Image Size Helpers

```markdown
![Small Image](images/small.png){.small}
![Medium Image](images/medium.png){.medium}
![Large Image](images/large.png){.large}
```

| Class | Size |
| ------- | ------ |
| `.small` | 30% width |
| `.medium` | 60% width |
| `.large` | 90% width |

---

## Code Blocks

Code blocks include syntax highlighting.

### Java Example

```java
public class LinkedList {
    private Node head;

    public void add(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
        } else {
            Node current = head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = newNode;
        }
    }
}
```

### Supported Languages

- Java
- Python
- JavaScript
- C++
- HTML/CSS
- And more...

---

## Font Scaling

The entire presentation can be scaled using the `--font-scale` variable in `styles/slides.css`:

```css
:root {
    --font-scale: 1.0;
}
```

### Common Values

```text
--font-scale: 0.8   → 20% smaller
--font-scale: 0.9   → 10% smaller
--font-scale: 1.0   → Normal
--font-scale: 1.1   → 10% larger
--font-scale: 1.2   → 20% larger
--font-scale: 1.3   → 30% larger
```

---

## Complete Slide Example

```markdown
# Data Structures

## Arrays vs Linked Lists

<!-- column -->
**Arrays**
- Fixed size
- Contiguous memory
- O(1) access
- Poor insertion/deletion

![Array Diagram](images/array.png)

<!-- column -->
**Linked Lists**
- Dynamic size
- Non-contiguous memory
- O(n) access
- Fast insertion/deletion

![Linked List Diagram](images/linkedlist.png)

<!-- endcolumns -->

**Key Takeaway:** Choose arrays for fixed-size, index-based access. Choose linked lists for dynamic size with frequent insertions/deletions.

<!-- footer -->
slides/02_linked_lists.md | CIS211 | Spring 2026

---

## Next Topic

Stacks and Queues
```

---

# Repository Maintenance Notes

The information below is primarily for instructors and future maintainers.

## Repository Structure

```text
DTCC-CIS211/
├── index.html              # Redirects to framework catalog
├── manifest.json           # Generated course metadata
└── content/
    ├── module00/           # Course info (not displayed as a module)
    │   └── 00_course_info.md
    ├── module01/
    │   ├── 00_module_overview.md
    │   ├── 01_data_structures_intro.md
    │   └── images/
    ├── module02/
    │   ├── 00_module_overview.md
    │   ├── 01_arraylists.md
    │   └── images/
    ├── module03/
    │   ├── 00_module_overview.md
    │   ├── 01_linked_lists.md
    │   └── images/
    ├── module04/
    │   ├── 00_module_overview.md
    │   ├── 01_stacks.md
    │   └── images/
    ├── module05/
    │   ├── 00_module_overview.md
    │   ├── 01_queues.md
    │   └── images/
    ├── module06/
    │   ├── 00_module_overview.md
    │   ├── 01_recursion.md
    │   └── images/
    ├── module07/
    │   ├── 00_module_overview.md
    │   ├── 01_trees.md
    │   └── images/
    ├── module08/
    │   ├── 00_module_overview.md
    │   ├── 01_sorting.md
    │   └── images/
    └── module09/
        ├── 00_module_overview.md
        ├── 01_hashing.md
        └── images/
```

---

## Creating a New Lecture

### Step 1

Create a Markdown file in the appropriate module folder:

```text
content/module03/01_linked_lists.md
```

### Step 2

Add slides separated by:

```text
---
```

Example:

```text
# Linked Lists

---

## Node Structure

- Data
- Next pointer

<!-- footer -->
Module 3 | CIS211

---

## Linked List Operations

- Add to front
- Add to end
- Remove
- Search
```

### Step 3

Regenerate the manifest:

```bash
python generate_manifest.py
```

### Step 4

Commit and push changes:

```bash
git add .
git commit -m "Add linked lists lecture"
git push origin main
```

---

## Module Organization

| Module | Topic |
|--------|-------|
| module00 | Course Information (not displayed) |
| module01 | Introduction to Data Structures |
| module02 | ArrayLists |
| module03 | Linked Lists |
| module04 | Stacks |
| module05 | Queues |
| module06 | Recursion |
| module07 | Trees |
| module08 | Sorting Algorithms |
| module09 | Hashing |

---

## License

MIT License

---

## Acknowledgments

- [Reveal.js](https://revealjs.com/) - Presentation framework
- [marked.js](https://marked.js.org/) - Markdown parser
- [GitHub Pages](https://pages.github.com/) - Hosting
- [DTCC Lectures RevealJS Framework](https://github.com/jinsungpsu/DTCC-Lectures-RevealJS-Framework) - Centralized framework