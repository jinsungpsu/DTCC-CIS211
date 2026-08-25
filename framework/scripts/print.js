(function() {
    'use strict';

    // ============================================================
    // CONFIGURATION
    // ============================================================
    const SLIDE_SEPARATORS = new Set(['---', '***', '___']);
    const NOTES_MARKER = '<!-- notes -->';

    // ============================================================
    // DOM REFERENCES - with safety checks
    // ============================================================
    function getSlidesContainer() {
        const container = document.getElementById('slides-container');
        if (!container) {
            console.error('Element with id "slides-container" not found!');
            // Create a fallback container
            const fallback = document.createElement('div');
            fallback.id = 'slides-container';
            fallback.style.padding = '20px';
            fallback.style.color = 'red';
            fallback.innerHTML = 'Error: Slides container not found. Please check your HTML.';
            document.body.appendChild(fallback);
            return fallback;
        }
        return container;
    }

    function getCourseInfo() {
        const info = document.getElementById('course-info');
        if (!info) {
            console.warn('Element with id "course-info" not found');
            // Create a fallback
            const fallback = document.createElement('div');
            fallback.id = 'course-info';
            const header = document.getElementById('header') || document.body;
            header.appendChild(fallback);
            return fallback;
        }
        return info;
    }

    // ============================================================
    // UTILITY FUNCTIONS
    // ============================================================

    /**
     * Get the deck path from URL parameters
     */
    function getDeckPath() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('deck');
    }

    /**
     * Get the base path (directory) of the markdown file
     */
    function getBasePath(deckPath) {
        return deckPath.substring(0, deckPath.lastIndexOf('/') + 1);
    }

    /**
     * Fix image paths in markdown content
     */
    function fixImagePaths(markdown, basePath) {
        let processed = markdown;

        // Handle images that reference ../framework/images/
        processed = processed.replace(
            /!\[([^\]]*)\]\(\.\.\/framework\/images\/([^)]+)\)/g,
            (match, alt, filename) => {
                return `![${alt}](${basePath}images/${filename})`;
            }
        );

        // Handle images that reference images/ (without ../)
        processed = processed.replace(
            /!\[([^\]]*)\]\(images\/([^)]+)\)/g,
            (match, alt, filename) => {
                return `![${alt}](${basePath}images/${filename})`;
            }
        );

        // Handle images that reference ./images/
        processed = processed.replace(
            /!\[([^\]]*)\]\(\.\/images\/([^)]+)\)/g,
            (match, alt, filename) => {
                return `![${alt}](${basePath}images/${filename})`;
            }
        );

        // Handle images that reference ../images/
        processed = processed.replace(
            /!\[([^\]]*)\]\(\.\.\/images\/([^)]+)\)/g,
            (match, alt, filename) => {
                return `![${alt}](${basePath}images/${filename})`;
            }
        );

        return processed;
    }

    /**
     * Split markdown into slides based on separators
     */
    function splitSlides(markdown) {
        const slides = [];
        let currentSlide = [];
        const lines = markdown.split('\n');
        let inCodeBlock = false;

        for (const line of lines) {
            const trimmed = line.trim();

            // Check if we're in a code block
            if (trimmed.startsWith('```')) {
                inCodeBlock = !inCodeBlock;
                currentSlide.push(line);
                continue;
            }

            // Check if this is a slide separator (only if not in code block)
            if (!inCodeBlock && SLIDE_SEPARATORS.has(trimmed)) {
                if (currentSlide.length > 0) {
                    slides.push(currentSlide.join('\n'));
                }
                currentSlide = [];
                continue;
            }

            currentSlide.push(line);
        }

        // Add the last slide
        if (currentSlide.length > 0 || slides.length === 0) {
            slides.push(currentSlide.join('\n'));
        }

        return slides;
    }

    /**
     * Extract notes from slide content
     */
    function extractNotes(slideContent) {
        const notesMatch = slideContent.match(/<!-- notes -->\s*([\s\S]*?)\s*(?=<!--|$)/);
        if (notesMatch) {
            const notes = notesMatch[1].trim();
            const content = slideContent.replace(/<!-- notes -->\s*[\s\S]*?(?=<!--|$)/, '');
            return { content, notes };
        }
        return { content: slideContent, notes: '' };
    }

    /**
     * Group slides into pairs for 2-up layout
     */
    function groupSlidesIntoPairs(slides) {
        const pairs = [];
        for (let i = 0; i < slides.length; i += 2) {
            pairs.push({
                left: slides[i],
                right: slides[i + 1] || null
            });
        }
        return pairs;
    }

    /**
     * Render a slide with marked
     */
    function renderSlide(content) {
        if (!content) return '';
        // Check if marked is available
        if (typeof marked === 'undefined') {
            console.error('marked.js is not loaded!');
            return content;
        }
        return marked.parse(content);
    }

    /**
     * Create the HTML for a single slide with notes
     */
    function createSlideHTML(slideNumber, content, notes) {
        const renderedSlide = renderSlide(content);
        const renderedNotes = notes ? renderSlide(notes) : '';

        return `
            <div class="slide-wrapper">
                <div class="slide-number">Slide ${slideNumber}</div>
                <div class="slide markdown-body">
                    ${renderedSlide}
                </div>
                ${notes ? `
                <div class="notes-wrapper">
                    <div class="notes-heading">Notes</div>
                    <div class="notes markdown-body">
                        ${renderedNotes}
                    </div>
                </div>` : ''}
            </div>
        `;
    }

    /**
     * Render all slides as HTML
     */
    function renderAllSlides(slides) {
        const pairs = groupSlidesIntoPairs(slides);
        let html = '';
        let slideNumber = 1;

        pairs.forEach((pair) => {
            // Process left slide
            const left = extractNotes(pair.left);
            const leftHTML = createSlideHTML(slideNumber, left.content, left.notes);

            // Process right slide
            let rightHTML = '';
            if (pair.right) {
                const right = extractNotes(pair.right);
                rightHTML = createSlideHTML(slideNumber + 1, right.content, right.notes);
            } else {
                rightHTML = `
                    <div class="slide-wrapper">
                        <div class="slide-number">Slide ${slideNumber + 1}</div>
                        <div class="slide markdown-body" style="display:flex;align-items:center;justify-content:center;color:#999;font-style:italic;">
                            (Blank - End of presentation)
                        </div>
                    </div>
                `;
            }

            html += `
                <div class="print-page">
                    ${leftHTML}
                    ${rightHTML}
                </div>
            `;

            slideNumber += 2;
        });

        return html;
    }

    // ============================================================
    // MAIN FUNCTION
    // ============================================================

    function loadAndRenderHandout() {
        const slidesContainer = getSlidesContainer();
        const deckPath = getDeckPath();

        if (!deckPath) {
            slidesContainer.innerHTML = '<p>No deck specified. Use ?deck=path/to/file.md</p>';
            return;
        }

        const basePath = getBasePath(deckPath);

        // Check if SlideMarkdownParser is available
        if (typeof SlideMarkdownParser === 'undefined') {
            slidesContainer.innerHTML = `
                <p style="color: red; padding: 20px; border: 1px solid red; border-radius: 4px;">
                    <strong>Error:</strong> SlideMarkdownParser is not loaded. 
                    Please make sure slide-parser.js is loaded before print.js.
                </p>
            `;
            return;
        }

        // Check if marked is available
        if (typeof marked === 'undefined') {
            slidesContainer.innerHTML = `
                <p style="color: red; padding: 20px; border: 1px solid red; border-radius: 4px;">
                    <strong>Error:</strong> marked.js is not loaded. 
                    Please make sure marked.min.js is loaded before print.js.
                </p>
            `;
            return;
        }

        fetch(deckPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(markdown => {
                // Normalize line endings
                let processed = SlideMarkdownParser.normalizeLineEndings(markdown);

                // Fix image paths
                processed = fixImagePaths(processed, basePath);

                // Parse custom syntax (footers, columns, etc.)
                processed = SlideMarkdownParser.parseCustomSyntax(processed);

                // Split into slides
                const slides = splitSlides(processed);

                // Render all slides
                const html = renderAllSlides(slides);

                slidesContainer.innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading markdown:', error);
                slidesContainer.innerHTML = `
                    <p style="color: red; padding: 20px; border: 1px solid red; border-radius: 4px;">
                        <strong>Error loading:</strong> ${error.message}
                    </p>
                `;
            });
    }

    // ============================================================
    // EVENT HANDLING
    // ============================================================

    // Load when DOM is ready
    function init() {
        // Check if the DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                // Small delay to ensure all scripts are loaded
                setTimeout(loadAndRenderHandout, 100);
            });
        } else {
            // DOM is already loaded, but wait for scripts
            setTimeout(loadAndRenderHandout, 100);
        }
    }

    // Add print button to header
    function addPrintButton() {
        const courseInfo = getCourseInfo();
        if (courseInfo) {
            // Check if button already exists
            if (!courseInfo.querySelector('.print-button')) {
                const printBtn = document.createElement('button');
                printBtn.className = 'print-button';
                printBtn.textContent = '🖨 Print Handout';
                printBtn.onclick = function() {
                    window.print();
                };
                courseInfo.appendChild(printBtn);
            }
        }
    }

    // Initialize
    init();

    // Add print button after a small delay
    setTimeout(addPrintButton, 200);

})();