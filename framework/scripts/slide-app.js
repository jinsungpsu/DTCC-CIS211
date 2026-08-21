(function () {
    // ============================================================
    //  CONFIGURATION - Edit these values to customize your slides
    // ============================================================

    const REVEAL_CONFIG = {

        hash: true,
        controls: true,
        progress: true,
        slideNumber: true,
        transition: "none",
        backgroundTransition: 'none',
        autoAnimate: false,

        // Fill the container instead of scaling a fixed 960x700 canvas —
        // this is what removes the left/right margins. Padding/spacing is
        // then handled entirely by reveal-theme.css.
        width: '90%',
        height: '100%',
        margin: 0,
        minScale: 1,
        maxScale: 1,

        // Add any additional Reveal.js options here
        // See: https://revealjs.com/config/
    };

    const CHALKBOARD_CONFIG = {
        boardmarkerWidth: 3,
        chalkWidth: 7,
        chalkEffect: 1.0,
        storage: null,
        src: null,
        readOnly: undefined,
        transition: 800,
        theme: "chalkboard",
        background: ['rgba(127,127,127,.1)'],
        grid: { color: 'rgb(50,50,10,0.5)', distance: 80, width: 2 },
        eraser: { radius: 20 }
    };

    const MENU_CONFIG = {
        side: 'left',
        width: 'normal',
        numbers: true,
        themes: false,
        transitions: false,
        openButton: false
    };

    // ============================================================
    //  DOM ELEMENT IDs - Change these if you rename elements
    // ============================================================

    const MARKDOWN_HOST_ID = "markdown-slide";
    const FOOTER_HOST_ID = "fixed-footer";
    const FULLSCREEN_BUTTON_ID = "fullscreenBtn";
    const NOTES_BUTTON_ID = "notesBtn";
    const MENU_BUTTON_ID = "menuBtn";

    const BUTTON_IDS = {
        search: "searchBtn",
        home: "homeBtn",
        prev: "prevBtn",
        next: "nextBtn",
        print: "printBtn",
        fullscreen: "fullscreenBtn",
        notes: "notesBtn",
        menu: "menuBtn"
    };

    // ============================================================
    //  MANIFEST PATHS - Order of paths to try when loading manifest
    // ============================================================

    const MANIFEST_PATHS = [
        "../manifest.json",
        "../../manifest.json",
        "manifest.json"
    ];

    // ============================================================
    //  INITIALIZATION - Start the slide app
    // ============================================================

    const file = new URLSearchParams(window.location.search).get("deck");

    if (!file) {
        document.getElementById(MARKDOWN_HOST_ID).innerHTML = "<h2>No deck specified.</h2>";
        throw new Error("Missing deck parameter");
    }

    const basePath = file.substring(0, file.lastIndexOf("/") + 1);
    const storageKey = `reveal-pos-${file}`;

    // ============================================================
    //  LECTURE INFO - Breadcrumb data
    // ============================================================

    let courseShort = "";
    let moduleTitle = "";
    let lectureTitle = "";

    function updateLectureInfo() {
        const courseSpan = document.getElementById("course-short");
        const moduleSpan = document.getElementById("module-name");
        const lectureSpan = document.getElementById("lecture-title");
        const breadcrumbGroup = document.getElementById("breadcrumb-group");

        if (courseSpan) courseSpan.textContent = courseShort;
        if (moduleSpan) moduleSpan.textContent = moduleTitle;
        if (lectureSpan) lectureSpan.textContent = lectureTitle;

        if (breadcrumbGroup && !courseShort && !moduleTitle && !lectureTitle) {
            breadcrumbGroup.style.display = "none";
        } else if (breadcrumbGroup) {
            breadcrumbGroup.style.display = "inline-flex";
        }
    }

    const deckFileName = file.substring(file.lastIndexOf("/") + 1);

    function tryLoadManifest(index) {
        if (index >= MANIFEST_PATHS.length) {
            updateLectureInfo();
            return;
        }

        const path = MANIFEST_PATHS[index];

        fetch(path)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            })
            .then(manifest => {
                if (manifest.course && manifest.course.code) {
                    courseShort = manifest.course.code;
                }

                for (const module of manifest.modules || []) {
                    for (const lecture of module.lectures || []) {
                        if (lecture.file === deckFileName) {
                            moduleTitle = module.title;
                            lectureTitle = lecture.title;
                            break;
                        }
                    }
                    if (moduleTitle) break;
                }
                updateLectureInfo();
            })
            .catch(error => {
                tryLoadManifest(index + 1);
            });
    }

    tryLoadManifest(0);

    // ============================================================
    //  MARKDOWN PROCESSING
    // ============================================================

    function rewriteRelativeUrls(markdown) {
        const lines = markdown.split('\n');
        let inCodeBlock = false;
        let result = [];

        for (let line of lines) {
            const trimmed = line.trim();

            // Check for code block boundaries
            if (trimmed.startsWith('```') && (trimmed.length === 3 || trimmed.startsWith('```'))) {
                inCodeBlock = !inCodeBlock;
                result.push(line);
                continue;
            }

            // Only process non-code lines
            if (!inCodeBlock) {
                // Match markdown links with proper text content
                line = line.replace(
                    /\[([^\]]+)\]\((?!https?:\/\/|\/|#|mailto:)([^)]+?)\)/g,
                    (match, text, url) => {
                        // Skip if the link text is just empty or brackets
                        if (!text || text.trim() === '' || text === '()' || text === '[]') {
                            return match;
                        }
                        return `[${text}](${basePath}${url})`;
                    }
                );
            }

            result.push(line);
        }

        return result.join('\n');
    }

    function renderMarkdown(markdown) {
        const host = document.getElementById(MARKDOWN_HOST_ID);
        host.innerHTML = `
                <textarea data-template>
${markdown}
                </textarea>
            `;
        host.setAttribute("data-markdown", "");
    }

    // ============================================================
    //  FOOTER SYNC
    // ============================================================

    function syncFixedFooter() {
        const footerHost = document.getElementById(FOOTER_HOST_ID);
        const currentSlide = Reveal.getCurrentSlide();
        if (!footerHost || !currentSlide) {
            return;
        }

        const footer = currentSlide.querySelector(".slide-footer");
        if (!footer) {
            footerHost.innerHTML = "";
            footerHost.style.display = "none";
            return;
        }

        footerHost.innerHTML = footer.innerHTML;
        footerHost.style.display = "block";
    }

    // ============================================================
    //  TOOLBAR BUTTON HANDLERS
    // ============================================================

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            return;
        }
        document.exitFullscreen();
    }

    function updateFullscreenButton() {
        const btn = document.getElementById(FULLSCREEN_BUTTON_ID);
        if (!btn) return;

        if (document.fullscreenElement) {
            document.body.classList.add("fullscreen-mode");
            btn.innerHTML = "✕";
            btn.title = "Exit Fullscreen";
        } else {
            document.body.classList.remove("fullscreen-mode");
            btn.innerHTML = "⛶";
            btn.title = "Enter Fullscreen";
        }
    }

    function toggleMenu() {
        if (typeof Reveal === 'undefined') {
            console.log('Reveal not available');
            return;
        }

        let menuPlugin = Reveal.getPlugin('menu');

        if (!menuPlugin) {
            const plugins = Reveal.getPlugins();
            for (const [name, plugin] of Object.entries(plugins)) {
                if (plugin && (typeof plugin.toggleMenu === 'function' ||
                    typeof plugin.toggle === 'function' ||
                    typeof plugin.openMenu === 'function')) {
                    menuPlugin = plugin;
                    console.log('Found menu plugin as:', name);
                    break;
                }
            }
        }

        if (menuPlugin) {
            if (typeof menuPlugin.toggleMenu === 'function') {
                menuPlugin.toggleMenu();
            } else if (typeof menuPlugin.toggle === 'function') {
                menuPlugin.toggle();
            } else if (typeof menuPlugin.openMenu === 'function') {
                if (typeof menuPlugin.isOpen === 'function' && menuPlugin.isOpen()) {
                    menuPlugin.closeMenu();
                } else {
                    menuPlugin.openMenu();
                }
            } else {
                document.dispatchEvent(new KeyboardEvent('keydown', {
                    key: 'm',
                    code: 'KeyM',
                    keyCode: 77,
                    which: 77,
                    bubbles: true,
                    cancelable: true
                }));
            }
        } else {
            document.dispatchEvent(new KeyboardEvent('keydown', {
                key: 'm',
                code: 'KeyM',
                keyCode: 77,
                which: 77,
                bubbles: true,
                cancelable: true
            }));
        }
    }

    function toggleNotes() {
        if (typeof Reveal === 'undefined') return;

        let chalkboard = Reveal.getPlugin('chalkboard');

        if (!chalkboard) {
            const plugins = Reveal.getPlugins();
            for (const [name, plugin] of Object.entries(plugins)) {
                if (name.toLowerCase().includes('chalkboard') ||
                    (plugin && typeof plugin.toggleNotesCanvas === 'function')) {
                    chalkboard = plugin;
                    console.log('Found chalkboard plugin as:', name);
                    break;
                }
            }
        }

        if (chalkboard && typeof chalkboard.toggleNotesCanvas === 'function') {
            chalkboard.toggleNotesCanvas();

            const notesBtn = document.getElementById(NOTES_BUTTON_ID);
            if (notesBtn) {
                notesBtn.classList.toggle('active');
                if (notesBtn.classList.contains('active')) {
                    notesBtn.style.background = 'rgba(139, 185, 255, 0.25)';
                    notesBtn.style.borderColor = '#8bb9ff';
                    notesBtn.style.color = '#8bb9ff';
                    notesBtn.title = 'Hide Notes Canvas';
                } else {
                    notesBtn.style.background = 'rgba(255, 255, 255, 0.08)';
                    notesBtn.style.borderColor = '#555';
                    notesBtn.style.color = '#ddd';
                    notesBtn.title = 'Toggle Notes Canvas';
                }
            }
        } else {
            console.log('Chalkboard plugin not available');
            const notes = Reveal.getPlugin('notes');
            if (notes) {
                const currentSlide = Reveal.getCurrentSlide();
                if (currentSlide) {
                    const notesEl = currentSlide.querySelector('.notes');
                    if (notesEl) {
                        const isVisible = notesEl.style.display !== 'none';
                        notesEl.style.display = isVisible ? 'none' : 'block';
                    }
                }
            }
        }
    }

    function openSearch() {
        document.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: "F",
                ctrlKey: true,
                shiftKey: true,
                bubbles: true
            })
        );
    }

    function printSlides() {
        enterPrintMode();
        window.print();
    }

    function enterPrintMode() {
        document.body.classList.add("printing");
        preparePrintFooters();
        const footerHost = document.getElementById(FOOTER_HOST_ID);
        if (footerHost) {
            footerHost.innerHTML = "";
            footerHost.style.display = "none";
            footerHost.style.visibility = "hidden";
        }
    }

    function exitPrintMode() {
        document.body.classList.remove("printing");
        clearPrintFooters();
        const footerHost = document.getElementById(FOOTER_HOST_ID);
        if (footerHost) {
            footerHost.style.visibility = "visible";
        }
        syncFixedFooter();
    }

    function clearPrintFooters() {
        document.querySelectorAll(".print-slide-footer").forEach(node => node.remove());
    }

    function preparePrintFooters() {
        clearPrintFooters();
        document.querySelectorAll(".reveal .slides section").forEach(section => {
            const sourceFooter = section.querySelector(".slide-footer");
            if (!sourceFooter) return;

            const printFooter = sourceFooter.cloneNode(true);
            printFooter.classList.add("print-slide-footer");
            section.appendChild(printFooter);
        });
    }

    // ============================================================
    //  BIND TOOLBAR
    // ============================================================

    function bindToolbar() {
        document.getElementById(BUTTON_IDS.search).addEventListener("click", openSearch);
        document.getElementById(BUTTON_IDS.home).addEventListener("click", () => {
            window.location.href = "index.html";
        });
        document.getElementById(BUTTON_IDS.prev).addEventListener("click", () => Reveal.prev());
        document.getElementById(BUTTON_IDS.next).addEventListener("click", () => Reveal.next());
        document.getElementById(BUTTON_IDS.print).addEventListener("click", printSlides);
        document.getElementById(BUTTON_IDS.fullscreen).addEventListener("click", toggleFullscreen);

        const menuBtn = document.getElementById(BUTTON_IDS.menu);
        if (menuBtn) {
            menuBtn.addEventListener("click", toggleMenu);
        }

        const notesBtn = document.getElementById(BUTTON_IDS.notes);
        if (notesBtn) {
            notesBtn.addEventListener("click", toggleNotes);
            document.addEventListener('keydown', (e) => {
                if (e.key === 'n' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                    const activeElement = document.activeElement;
                    if (activeElement && activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
                        e.preventDefault();
                        toggleNotes();
                    }
                }
            });
        }
    }

    // ============================================================
    //  REVEAL EVENTS
    // ============================================================

    function wireRevealEvents() {
        Reveal.on("slidechanged", () => {
            localStorage.setItem(storageKey, JSON.stringify(Reveal.getIndices()));
            syncFixedFooter();
        });

        Reveal.on("ready", () => {
            syncFixedFooter();
            const saved = localStorage.getItem(storageKey);
            if (!saved) return;

            const pos = JSON.parse(saved);
            Reveal.slide(pos.h, pos.v, pos.f);
            syncFixedFooter();
        });
    }

    function checkPlugins() {
        setTimeout(() => {
            if (typeof Reveal !== 'undefined') {
                const chalkboard = Reveal.getPlugin('chalkboard');
                console.log('Chalkboard plugin available:', !!chalkboard);
                const notes = Reveal.getPlugin('notes');
                console.log('Notes plugin available:', !!notes);
                const menu = Reveal.getPlugin('menu');
                console.log('Menu plugin available:', !!menu);

                const plugins = Reveal.getPlugins();
                console.log('All available plugins:', Object.keys(plugins));
            }
        }, 1500);
    }

    // ============================================================
    //  MAIN - Load and initialize
    // ============================================================

    fetch(file)
        .then(response => response.text())
        .then(markdown => {
            let parsedMarkdown = SlideMarkdownParser.normalizeLineEndings(markdown);
            parsedMarkdown = rewriteRelativeUrls(parsedMarkdown);
            parsedMarkdown = SlideMarkdownParser.parseCustomSyntax(parsedMarkdown);

            renderMarkdown(parsedMarkdown);
            wireRevealEvents();

            // Build plugins array
            const plugins = [
                RevealMarkdown,
                RevealNotes,
                RevealHighlight,
                RevealSearch
            ];

            // Add menu if available
            if (typeof RevealMenu !== 'undefined') {
                plugins.push(RevealMenu);
                console.log('Menu plugin found and added');
            } else if (typeof window.RevealMenu !== 'undefined') {
                plugins.push(window.RevealMenu);
                console.log('Menu plugin found and added (window)');
            } else {
                console.log('Menu plugin not found');
            }

            // Add chalkboard if available
            if (typeof RevealChalkboard !== 'undefined') {
                plugins.push(RevealChalkboard);
                console.log('Chalkboard plugin found and added');
            } else if (typeof window.RevealChalkboard !== 'undefined') {
                plugins.push(window.RevealChalkboard);
                console.log('Chalkboard plugin found and added (window)');
            } else {
                console.log('Chalkboard plugin not found');
            }

            // Combine all configs
            const fullConfig = {
                ...REVEAL_CONFIG,
                plugins: plugins,
                chalkboard: CHALKBOARD_CONFIG,
                menu: MENU_CONFIG
            };

            console.log('Reveal config:', fullConfig);
            Reveal.initialize(fullConfig);

            bindToolbar();
            updateFullscreenButton();
            document.addEventListener("fullscreenchange", updateFullscreenButton);
            window.addEventListener("beforeprint", enterPrintMode);
            window.addEventListener("afterprint", exitPrintMode);

            Reveal.on('ready', () => {
                checkPlugins();
            });
        })
        .catch(error => {
            console.error("Error loading markdown:", error);
            document.getElementById(MARKDOWN_HOST_ID).innerHTML =
                `<h2>Error loading slide</h2><p>${error.message}</p>`;
        });
}());