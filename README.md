# DTCC CIS211 Lecture Slides

Welcome to the CIS211 lecture slide repository.

This site contains lecture materials for:

**CIS211 – Data Structures**

Slides are provided as interactive Reveal.js presentations and are organized by module.

---

# Accessing the Lectures

Start here:

```text
https://jinsungpsu.github.io/DTCC-CIS211-Slides/
```

From the home page, select the lecture you would like to view.

---

# Viewing a Lecture

Each lecture opens as an interactive slide deck.

You may navigate using:

## Keyboard

```text
→ Right Arrow    Next slide
← Left Arrow     Previous slide
Space            Next slide
Esc              Slide overview
F                Fullscreen
```

## Toolbar

The toolbar appears at the top of the presentation.

```text
↩  Return to lecture list

◀  Previous slide

▶  Next slide

🔍 Search slides

⤢ Enter fullscreen

✕ Exit fullscreen
```

---

# Searching Within a Lecture

The Search feature lets you quickly find topics in the current lecture.

Examples:

```text
ArrayList
constructor
recursion
ADT
```

Search is useful when reviewing material before quizzes, exams, and programming assignments.

---

# Fullscreen Mode

For the best viewing experience:

1. Open a lecture.
2. Click the fullscreen button:

```text
⤢
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

# Code Examples

Many lectures contain Java code.

Code blocks include syntax highlighting to make examples easier to read and understand.

Example:

```java
int[] nums = new int[10];

for(int i = 0; i < nums.length; i++)
{
    System.out.println(i);
}
```

---

# Mobile Devices

Lectures can be viewed on phones and tablets.

Navigation options:

- Swipe left/right
- Use on-screen controls
- Rotate device to landscape for the best experience

---

# Printing

Certain lectures may be printed or saved as PDF using the toolbar print button.

Printing is intended primarily for note-taking and offline review.

---

# Speaker Notes

Most students can ignore this section.

Speaker Notes are intended for instructors presenting the lecture.

Notes are not visible in the normal presentation view.

---

## Presenter View

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

---

## Typical Classroom Setup

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

---

## Notes in Lecture Source Files

Speaker notes are stored inside lecture Markdown files.

Example:

```markdown
# Arrays

Arrays have fixed size.

Note:
Remind students:
- Compare ArrayList
- Explain contiguous memory
- Discuss O(1) access
```

Anything following:

```markdown
Note:
```

appears only in Presenter View.

Students never see these notes.

---

# Technical Information

The site is built using:

- Markdown
- Reveal.js
- GitHub Pages

Lecture content is maintained in Markdown and rendered as interactive presentations.

---

# Repository Maintenance Notes

The information below is primarily for instructors and future maintainers.

---

## Repository Structure

```text
DTCC-CIS211-Slides/
│
├── index.html
├── slide.html
│
├── module01/
│   ├── 01_data_structures_intro.md
│
├── module02/
│
└── images/
```

---

## Creating a New Lecture

### Step 1

Create a Markdown file:

```text
module03/01_stacks.md
```

### Step 2

Add slides separated by:

```markdown
---
```

Example:

```markdown
# Stacks

---

# Stack Operations

- Push
- Pop
- Peek
```

### Step 3

Add a link to `index.html`:

```html
./slide.html?deck=module03/01_stacks.md
```

---

## Images

Store all images under:

```text
images/
```

Example:

```text
images/stacks/push-pop.png
```

Reference in Markdown:

```markdown
../images/stacks/push-pop.png
```

---

## Naming Convention

Recommended:

```text
01_data_structures_intro.md
02_arraylists.md
03_linked_lists.md
04_stacks.md
05_queues.md
```

This helps keep lectures organized and sorted correctly.

---

## Source of Truth

Lecture content lives in Markdown files.

```text
Markdown
    ↓
Reveal.js
    ↓
GitHub Pages
```

Markdown files should always be treated as the authoritative source for lecture content.