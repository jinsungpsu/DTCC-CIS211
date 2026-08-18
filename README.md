# DTCC CIS211 Lecture Slides

Welcome to the CIS211 lecture slide repository.

This site contains lecture materials for:

**CIS211 – Data Structures**

Slides are provided as interactive Reveal.js presentations and are organized by module.

---

## Accessing the Lectures

Start here:

```text
https://jinsungpsu.github.io/DTCC-CIS211-Slides/
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
↩  Return to lecture list

◀  Previous slide

▶  Next slide

🔍 Search slides

⛶ Enter Fullscreen

✕ Exit Fullscreen

🖨 Print / Save as PDF
```

---

## Searching Within a Lecture

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
int[] nums = new int[10];

for(int i = 0; i < nums.length; i++)
{
    System.out.println(i);
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

## Printing

Certain lectures may be printed or saved as PDF using the toolbar print button.

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

## Technical Information

The site is built using:

- Markdown
- Reveal.js
- GitHub Pages

Lecture content is maintained in Markdown and rendered as interactive presentations.

---

# Writing Lecture Content

This section covers how to create and format lecture slides using Markdown.

## Basic Slide Structure

Each slide is separated by:

```markdown
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

### Features

- **Auto-detects** number of columns (2, 3, 4+)
- **Columns scroll** if content is too long
- **Images** automatically scale to fit columns
- **Lists** and **code blocks** work inside columns
- **Responsive** - stacks vertically on mobile

### Images in Columns

```markdown
<!-- column -->
![Diagram](images/diagram.jpg)

<!-- column -->
- List item 1
- List item 2
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
- **Auto-spacing** - content won't overlap footer

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
![Push Pop Example](images/stacks/push-pop.png)
```

### Image Size Helpers

You can control image size using CSS classes:

```markdown
![Small Image](images/small.png){.small}
![Medium Image](images/medium.png){.medium}
![Large Image](images/large.png){.large}
```

| Class | Size |
|-------|------|
| `.small` | 30% width |
| `.medium` | 60% width |
| `.large` | 90% width |

---

## Code Blocks

Code blocks include syntax highlighting.

### Java Example

```java
public class Example {
    public static void main(String[] args) {
        System.out.println("Hello");
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
    --font-scale: 1.0;  /* 1.0 = normal */
}
```

### Common Values

```text
--font-scale: 0.8   → 20% smaller (compact)
--font-scale: 0.9   → 10% smaller
--font-scale: 1.0   → Normal (default)
--font-scale: 1.1   → 10% larger
--font-scale: 1.2   → 20% larger
--font-scale: 1.3   → 30% larger (presentation mode)
```

This scales all text sizes proportionally:

- Headings (H1-H6)
- Body text
- Lists
- Code blocks
- Footer
- Column gaps
- Slide padding

---

## Complete Slide Example

Here's a complete example combining all features:

```markdown
# Data Structures

## Arrays vs ArrayLists

<!-- column -->
**Arrays**
- Fixed size
- Contiguous memory
- O(1) access
- Primitives supported

![Array Diagram](images/array.png)

<!-- column -->
**ArrayLists**
- Dynamic size
- Resizes automatically
- O(1) access
- Objects only

![ArrayList Diagram](images/arraylist.png)

<!-- footer -->
[Lecture 2](slides/02_arraylists.md) | CIS211 | Spring 2026

---

## Next Topic

This is the next slide.
```

---

# Repository Maintenance Notes

The information below is primarily for instructors and future maintainers.

## Repository Structure

```text
DTCC-CIS211-Slides/
│
├── index.html
├── slide.html
├── README.md
│
├── styles/
│   └── slides.css
│
├── module01/
│   ├── 01_data_structures_intro.md
│   └── images/
│
├── module02/
│   ├── 01_arraylists.md
│   └── images/
│
├── module03/
│   ├── 01_linked_lists.md
│   └── images/
│
├── module04/
│   ├── 01_stacks.md
│   └── images/
│
├── module05/
│   ├── 01_queues.md
│   └── images/
│
├── module06/
│   ├── 01_recursion.md
│   └── images/
│
├── module07/
│   ├── 01_trees.md
│   └── images/
│
└── images/
    └── (shared images)
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

<!-- footer -->
Module 3 | CIS211

---

# Stack Example

```java
Stack<Integer> stack = new Stack<>();
stack.push(1);
stack.push(2);
System.out.println(stack.pop()); // 2
```
```

### Step 3

Add a link to `index.html`:

```html
<a href="./slide.html?deck=module03/01_stacks.md" class="lecture-card">
    <span class="lec-num">M3</span>
    <span class="lec-title">Stacks</span>
</a>
```

---

## Adding Images

### Option 1: Module-Specific Images

Store images in the module's `images/` folder:

```text
module03/images/push-pop.png
```

Reference in Markdown:

```markdown
![Push Pop](images/push-pop.png)
```

### Option 2: Shared Images

Store shared images in the root `images/` folder:

```text
images/common/logo.png
```

Reference in Markdown:

```markdown
![Logo](../images/common/logo.png)
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
06_recursion.md
07_trees.md
08_sorting.md
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

---

## Custom CSS Variables

The following CSS variables can be adjusted in `styles/slides.css` to customize the presentation:

### Font Sizes

```css
:root {
    --font-scale: 1.0;          /* Master scale */
    --heading-h1-size: 2.5em;   /* H1 size */
    --heading-h2-size: 1.8em;   /* H2 size */
    --body-font-size: 1em;      /* Body text */
    --list-font-size: 1em;      /* Lists */
    --footer-font-size: 0.5em;  /* Footer */
}
```

### Spacing

```css
:root {
    --heading-margin: 0.3em 0 0.2em 0;
    --body-margin: 0.3em 0;
    --columns-gap: 2rem;
    --footer-padding: 4px 0 4px 0;
    --slide-padding: 20px 40px 50px 40px;
}
```

### Colors

```css
:root {
    --heading-color: #fff;
    --body-color: #ddd;
    --list-color: #ddd;
    --footer-color: #999;
}
```

---

## Quick Reference

| Feature | Syntax | Example |
|---------|--------|---------|
| Slide separator | `---` | Between slides |
| Column | `<!-- column -->` | Between columns |
| Footer | `<!-- footer -->` | At end of slide |
| Speaker notes | `Note:` | After content |
| Image small | `{ .small }` | `![alt](img){.small}` |
| Image medium | `{ .medium }` | `![alt](img){.medium}` |
| Image large | `{ .large }` | `![alt](img){.large}` |

---

## Troubleshooting

### Images Not Showing

1. Check the file path is correct
2. Ensure the image exists in the correct folder
3. Use relative paths: `images/filename.jpg`

### Columns Not Working

1. Use `<!-- column -->` between each column
2. Leave a blank line after `<!-- column -->`
3. Make sure there are at least 2 columns

### Footer Not Showing

1. Use `<!-- footer -->` on its own line
2. Add content after the marker
3. Place at the end of the slide content

### Font Scaling Not Working

1. Check `styles/slides.css` exists
2. Verify `--font-scale` is in the `:root` section
3. Refresh the page after changes