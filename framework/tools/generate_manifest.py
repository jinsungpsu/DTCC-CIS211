import json
import re
from pathlib import Path


def first_heading(path, level):

    pattern = rf"^{'#' * level}\s+"

    with open(path, encoding="utf-8") as f:

        for line in f:

            line = line.strip()

            if re.match(pattern, line):
                return re.sub(pattern, "", line)

    return None


def get_all_headings(path):
    """Extract all heading levels and their content from a markdown file."""
    if not path or not path.exists():
        return {}
    
    headings = {}
    
    with open(path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            # Match any heading level (1-6)
            match = re.match(r'^(#{1,6})\s+(.+)', line)
            if match:
                level = len(match.group(1))
                content = match.group(2).strip()
                headings[level] = content
    
    return headings


def get_course_message(path):
    """Extract any content after the headings (level 4+) from module00."""
    if not path or not path.exists():
        return None
    
    with open(path, encoding="utf-8") as f:
        lines = f.readlines()
    
    # Skip heading lines (levels 1-3) and find content after them
    message_lines = []
    found_content = False
    
    for line in lines:
        stripped = line.strip()
        
        # Skip empty lines at the beginning
        if not found_content and not stripped:
            continue
            
        # Check if it's a heading
        heading_match = re.match(r'^(#{1,6})\s+(.+)', stripped)
        
        if heading_match:
            level = len(heading_match.group(1))
            # If it's level 1-3, these are already used for course metadata
            # For level 4+, treat as part of the message
            if level >= 4:
                found_content = True
                content = heading_match.group(2).strip()
                message_lines.append(content)
            elif found_content:
                # If we hit a level 1-3 heading after starting, stop collecting
                break
        elif found_content:
            # Keep collecting regular text after we've started
            if stripped:
                message_lines.append(stripped)
        elif stripped and not heading_match:
            # If we find regular text before any heading, start collecting
            found_content = True
            message_lines.append(stripped)
    
    return ' '.join(message_lines) if message_lines else None


#
# Course root structure:
# ./
# ├── index.html (redirects to framework/)
# ├── manifest.json
# ├── content/
# │   ├── module00/
# │   │   └── 00_ds_module_overview.md
# │   ├── module01/
# │   │   ├── 00_ds_module_overview.md
# │   │   ├── 01_ds_data_structures_intro.md
# │   │   └── images/
# │   └── ...
# └── framework/
#     ├── index.html (the actual course page)
#     ├── slide.html
#     ├── styles/
#     ├── scripts/
#     └── tools/
#         └── generate_manifest.py
#
# Note: This script is located at framework/tools/generate_manifest.py
#       The root is two levels up from this script
#

# Going up 2 levels from framework/tools/ to root
ROOT = Path(__file__).resolve().parents[2]
CONTENT_DIR = ROOT / "content"


#
# Course metadata
#

course = {
    "code": "",
    "name": "",
    "institution": "",
    "homeTitle": "",
    "message": ""
}

# module00 is in content/module00
module00 = CONTENT_DIR / "module00"

print(f"Looking for module00 at: {module00}")

if module00.exists():

    info_file = next(
        module00.glob("00_*.md"),
        None
    )

    if info_file:
        print(f"Found info file: {info_file}")
        # Get all headings at once
        headings = get_all_headings(info_file)
        
        course["code"] = headings.get(1, "")
        course["name"] = headings.get(2, "")
        course["institution"] = headings.get(3, "")
        
        # Use level 4 heading as homeTitle if it exists
        course["homeTitle"] = headings.get(4, "")

        # Get any additional message content (level 5+ or text after headings)
        course["message"] = (
            get_course_message(info_file) or ""
        )
        
        print(f"Course metadata: {course}")
    else:
        print(f"No 00_*.md file found in {module00}")
else:
    print(f"module00 directory not found at {module00}")


#
# Modules
#

modules_data = []

# Look for modules in content/ directory
for module_dir in sorted(CONTENT_DIR.glob("module*")):

    if not module_dir.is_dir():
        continue

    #
    # Skip course metadata folder
    #

    if module_dir.name == "module00":
        continue

    overview_file = next(
        module_dir.glob("00_*.md"),
        None
    )

    if not overview_file:
        print(f"No overview file found in {module_dir}")
        continue

    module_title = (
        first_heading(overview_file, 1)
        or overview_file.stem
    )

    lecture_files = sorted(
        [
            f for f in module_dir.glob("*.md")
            if not f.name.startswith("00_")
        ]
    )

    lectures = []

    for lecture in lecture_files:

        lectures.append({
            "file": lecture.name,
            "title": (
                first_heading(lecture, 1)
                or lecture.stem
            )
        })

    # Store just the module folder name (without "content/" prefix)
    modules_data.append({
        "folder": module_dir.name,  # Just "module01", not "content/module01"
        "title": module_title,
        "lectures": lectures
    })
    
    print(f"Added module: {module_dir.name} with {len(lectures)} lectures")


manifest = {
    "course": course,
    "modules": modules_data
}


manifest_path = ROOT / "manifest.json"

print(f"Writing manifest to: {manifest_path}")

with open(
    manifest_path,
    "w",
    encoding="utf-8"
) as f:

    json.dump(
        manifest,
        f,
        indent=4,
        ensure_ascii=False
    )

print(f"✅ Generated {manifest_path}")
print(f"   Found {len(modules_data)} modules")
print(f"   Total lectures: {sum(len(m['lectures']) for m in modules_data)}")