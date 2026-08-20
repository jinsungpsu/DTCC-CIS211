# DTCC-Lectures-RevealJS-Framework# DTCC Lectures RevealJS Framework

A reusable framework for hosting course lecture slides using:

- Reveal.js
- Markdown slide decks
- Dynamic course manifests
- GitHub Pages

This repository contains the shared HTML, CSS, JavaScript, and tooling used by multiple DTCC course repositories.

---

# Overview

The framework is designed to separate:

## Framework Assets

Stored in:

```text
DTCC-Lectures-RevealJS-Framework
```

Contains:

```text
index.html
slide.html

scripts/
styles/
tools/
```

These files are shared by all courses.

---

## Course Content

Stored in individual course repositories:

```text
DTCC-CSC164
DTCC-CSC263
DTCC-CIS211
...
```

Contains:

```text
module00/
module01/
module02/
...

manifest.json
framework/
```

Course repositories contain only content.

The framework repository contains all code.

---

# Course Repository Structure

Example:

```text
DTCC-CSC164/
│
├── index.html
├── manifest.json
│
├── module00/
│   └── 00_course_info.md
│
├── module01/
│   ├── 00_module_overview.md
│   ├── 01_topic.md
│   └── ...
│
├── module02/
│   ├── 00_module_overview.md
│   └── ...
│
└── framework/
    ├── index.html
    ├── slide.html
    ├── scripts/
    ├── styles/
    └── tools/
```

# Adding the Framework to a New Course

## 1. Clone the Course Repository

```bash
git clone <course-repo-url>
cd <course-repo>
```

## 2. Add the Framework Remote

```bash
git remote add framework https://github.com/jinsungpsu/DTCC-Lectures-RevealJS-Framework.git
```

Verify:

```bash
git remote -v
```

## 3. Download Framework History

```bash
git fetch framework
```

## 4. Add Framework as a Subtree

```bash
git subtree add --prefix=framework framework main --squash
```

## 5. Push Changes

```bash
git push origin main
```

# Updating an Existing Course Repository

```bash
cd DTCC-CSC164

git fetch framework

git subtree pull --prefix=framework framework main --squash

git push origin main
```

# Course Metadata

Create:

```text
module00/00_course_info.md
```

Format:

```markdown
# CSC164
## Computer Science II
### Delaware Technical Community College
#### DTCC
```

Mapping:

- `#` Course Code
- `##` Course Name
- `###` Institution Name
- `####` Institution Short Name

`module00` is reserved for metadata and is excluded from the generated module list.

# Manifest Generation

Tool:

```text
framework/tools/generate_manifest.py
```

Run:

```bash
python framework/tools/generate_manifest.py
```

Output:

```text
manifest.json
```

# GitHub Pages

Repository root should contain a redirect page that forwards users to:

```text
framework/index.html
```

Users continue visiting:

```text
https://jinsungpsu.github.io/<course-repo>/
```

# Common Commands

Add framework:

```bash
git remote add framework https://github.com/jinsungpsu/DTCC-Lectures-RevealJS-Framework.git
git fetch framework
git subtree add --prefix=framework framework main --squash
```

Update framework:

```bash
git fetch framework
git subtree pull --prefix=framework framework main --squash
```

Check remotes:

```bash
git remote -v
```

Check branch:

```bash
git branch --show-current
```

# Development Workflow

Update framework:

```bash
cd DTCC-Lectures-RevealJS-Framework
git add .
git commit -m "Framework update"
git push origin main
```

Update course:

```bash
cd DTCC-CSC164
git fetch framework
git subtree pull --prefix=framework framework main --squash
git push origin main
```

# Design Philosophy

Framework Repository:

- HTML
- CSS
- JavaScript
- Python tooling
- Reveal.js integration

Course Repository:

- Markdown slides
- Course metadata
- Module content
- Generated manifest

Keep framework code centralized and lecture content distributed.
