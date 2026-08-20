(function (global) {
    const FOOTER_MARKER = "<!-- footer -->";
    const COLUMN_MARKER = "<!-- column -->";
    const END_COLUMNS_MARKER = "<!-- endcolumns -->";

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

    function isEndColumnsMarker(line) {
        return line.trim() === END_COLUMNS_MARKER;
    }

    function isLayoutMarker(line) {
        const trimmed = line.trim();

        return (
            trimmed === FOOTER_MARKER ||
            trimmed === COLUMN_MARKER ||
            trimmed === END_COLUMNS_MARKER
        );
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

        return {
            slides,
            separators
        };
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

                if (
                    isSlideSeparator(nextLine) ||
                    isLayoutMarker(nextLine)
                ) {
                    break;
                }

                footerContent.push(nextLine);
                i++;
            }

            const footerText = footerContent.join("\n").trim();

            if (footerText) {
                result.push(
                    `<div class="slide-footer" data-markdown>\n\n${footerText}\n\n</div>\n\n`
                );
            }
        }

        return result.join("\n");
    }

    function parseColumns(markdown) {
        const split = splitSlides(markdown);
        const processedSlides = split.slides.map(processSlide);

        return joinSlides(processedSlides, split.separators);
    }

    function finalizeColumn(columns, currentColumn) {
        const content = currentColumn.join("\n").trim();

        if (content) {
            columns.push(content);
        }
    }

    function buildColumnsHtml(columns) {
        const colsClass = `cols-${columns.length}`;

        let html = `<div class="columns-container ${colsClass}">\n`;

        columns.forEach(colContent => {
            html +=
                `<div class="col" data-markdown>\n\n${colContent}\n\n</div>\n`;
        });

        html += "</div>\n\n";

        return html;
    }

    function processSlide(slide) {
        const lines = slide.split("\n");
        const result = [];

        let i = 0;

        while (i < lines.length) {
            const line = lines[i];

            // Ignore stray endcolumns markers
            if (isEndColumnsMarker(line)) {
                i++;
                continue;
            }

            // Normal slide content
            if (!isColumnMarker(line)) {
                result.push(line);
                i++;
                continue;
            }

            const columns = [];
            let currentColumn = [];

            while (i < lines.length) {
                const currentLine = lines[i];

                if (isColumnMarker(currentLine)) {
                    finalizeColumn(columns, currentColumn);
                    currentColumn = [];
                    i++;
                    continue;
                }

                if (
                    isEndColumnsMarker(currentLine) ||
                    isFooterMarker(currentLine)
                ) {
                    break;
                }

                currentColumn.push(currentLine);
                i++;
            }

            finalizeColumn(columns, currentColumn);

            if (columns.length >= 2) {
                result.push(buildColumnsHtml(columns));
            }
            else if (columns.length === 1) {
                result.push(columns[0]);
            }

            if (
                i < lines.length &&
                isEndColumnsMarker(lines[i])
            ) {
                i++;
            }
        }

        return result.join("\n");
    }

    global.SlideMarkdownParser = {
        normalizeLineEndings,
        parseCustomSyntax
    };
}(window));