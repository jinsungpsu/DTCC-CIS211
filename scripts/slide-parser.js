(function (global) {
    const FOOTER_MARKER = "<!-- footer -->";
    const COLUMN_MARKER = "<!-- column -->";
    const SLIDE_SEPARATORS = new Set(["---", "***", "___"]);

    function normalizeLineEndings(markdown) {
        return markdown.replace(/\r\n?/g, "\n");
    }

    function isFooterMarker(line) {
        return line.trim() === FOOTER_MARKER;
    }

    function isColumnMarker(line) {
        return line.trim() === COLUMN_MARKER;
    }

    function isSlideSeparator(line) {
        return SLIDE_SEPARATORS.has(line.trim());
    }

    function splitSlides(markdown) {
        const lines = markdown.split("\n");
        const slides = [];
        const separators = [];
        let current = [];

        for (const line of lines) {
            if (isSlideSeparator(line)) {
                slides.push(current.join("\n"));
                separators.push(line.trim());
                current = [];
                continue;
            }

            current.push(line);
        }

        slides.push(current.join("\n"));
        return { slides, separators };
    }

    function joinSlides(slides, separators) {
        if (slides.length === 0) {
            return "";
        }

        let result = slides[0];
        for (let i = 1; i < slides.length; i++) {
            result += `\n${separators[i - 1]}\n${slides[i]}`;
        }
        return result;
    }

    function parseCustomSyntax(markdown) {
        let parsed = parseFooters(markdown);
        parsed = parseColumns(parsed);
        return parsed;
    }

    function parseFooters(markdown) {
        const lines = markdown.split("\n");
        const result = [];
        let i = 0;

        while (i < lines.length) {
            const line = lines[i];

            if (!isFooterMarker(line)) {
                result.push(line);
                i++;
                continue;
            }

            i++;
            const footerContent = [];

            while (i < lines.length) {
                const nextLine = lines[i];
                if (isSlideSeparator(nextLine) || isColumnMarker(nextLine)) {
                    break;
                }

                footerContent.push(nextLine);
                i++;
            }

            if (footerContent.length > 0) {
                const footerText = footerContent.join("\n").trim();
                result.push(`<div class="slide-footer" data-markdown>\n\n${footerText}\n\n</div>`);
            }
        }

        return result.join("\n");
    }

    function parseColumns(markdown) {
        const split = splitSlides(markdown);
        const processedSlides = split.slides.map(processSlide);
        return joinSlides(processedSlides, split.separators);
    }

    function processSlide(slide) {
        const lines = slide.split("\n");
        const result = [];
        let i = 0;

        while (i < lines.length) {
            const line = lines[i];
            if (!isColumnMarker(line)) {
                result.push(line);
                i++;
                continue;
            }

            i++;
            const columns = [];
            let currentCol = [];
            let inColumn = true;

            while (i < lines.length && inColumn) {
                const nextLine = lines[i];

                if (isColumnMarker(nextLine)) {
                    if (currentCol.length > 0) {
                        columns.push(currentCol.join("\n"));
                    }
                    currentCol = [];
                    i++;
                    continue;
                }

                if (isFooterMarker(nextLine)) {
                    inColumn = false;
                    break;
                }

                currentCol.push(nextLine);
                i++;
            }

            if (currentCol.length > 0) {
                columns.push(currentCol.join("\n"));
            }

            if (columns.length >= 2) {
                const colsClass = `cols-${Math.min(columns.length, 4)}`;
                let html = `<div class="columns-container ${colsClass}">\n`;
                columns.forEach(colContent => {
                    html += `<div class="col" data-markdown>\n\n${colContent}\n\n</div>\n`;
                });
                html += "</div>";
                result.push(html);
            } else if (columns.length === 1) {
                result.push(columns[0]);
            }
        }

        return result.join("\n");
    }

    global.SlideMarkdownParser = {
        normalizeLineEndings,
        parseCustomSyntax
    };
}(window));
