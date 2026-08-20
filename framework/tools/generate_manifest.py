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
            
        # If we find a level 4 heading or regular text, start collecting
        if stripped and (re.match(r'^#{4}\s+', stripped) or not re.match(r'^#{1,3}\s+', stripped)):
            found_content = True
            # Remove heading markers if it's a level 4 heading
            if re.match(r'^#{4}\s+', stripped):
                message_lines.append(re.sub(r'^#{4}\s+', '', stripped))
            else:
                message_lines.append(stripped)
        elif found_content:
            # Keep collecting after we've started
            if stripped:
                message_lines.append(stripped)
    
    return ' '.join(message_lines) if message_lines else None


#
# Course root:
# DTCC-CSC164/
# ├── framework/
# │   └── tools/
# │       └── generate_manifest.py
# ├── module00/
# ├── module01/
# └── ...
#

ROOT = Path(__file__).resolve().parents[2]


#
# Course metadata
#

course = {
    "code": "",
    "name": "",
    "institution": "",
    "message": ""  # Added field for the extra message
}

module00 = ROOT / "module00"

if module00.exists():

    info_file = next(
        module00.glob("00_*.md"),
        None
    )

    if info_file:

        course["code"] = (
            first_heading(info_file, 1) or ""
        )

        course["name"] = (
            first_heading(info_file, 2) or ""
        )

        course["institution"] = (
            first_heading(info_file, 3) or ""
        )

        # Get any additional message content (level 4+ or text after headings)
        course["message"] = (
            get_course_message(info_file) or ""
        )


#
# Modules
#

modules_data = []

for module_dir in sorted(ROOT.glob("module*")):

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

    modules_data.append({
        "folder": module_dir.name,
        "title": module_title,
        "lectures": lectures
    })


manifest = {
    "course": course,
    "modules": modules_data
}


manifest_path = ROOT / "manifest.json"

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

print(f"Generated {manifest_path}")