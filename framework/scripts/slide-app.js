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

        width: "90%",
        height: "90%",
        margin: 0,
        
        minScale: 0.2,
        maxScale: 1.0,
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

    const MANIFEST_PATHS = [
        "../manifest.json",
        "../../manifest.json",
        "manifest.json"
    ];

    // ============================================================
    //  VERIFY DOM ELEMENTS EXIST
    // ============================================================

    function ensureElementExists(elementId) {
        const element = document.getElementById(elementId);
        if (!element) {
            const slidesContainer = document.querySelector('.reveal .slides');
            if (slidesContainer) {
                const newElement = document.createElement('section');
                newElement.id = elementId;
                slidesContainer.appendChild(newElement);
                return newElement;
            }
            return null;
        }
        return element;
    }

    // Ensure the markdown host exists
    const markdownHost = ensureElementExists(MARKDOWN_HOST_ID);
    if (!markdownHost) {
        const fallbackDiv = document.createElement('div');
        fallbackDiv.id = MARKDOWN_HOST_ID;
        fallbackDiv.style.display = 'block';
        fallbackDiv.style.padding = '20px';
        document.body.appendChild(fallbackDiv);
    }

    // ============================================================
    //  INITIALIZATION - Start the slide app
    // ============================================================

    const file = new URLSearchParams(window.location.search).get("deck");

    if (!file) {
        const host = document.getElementById(MARKDOWN_HOST_ID);
        if (host) {
            host.innerHTML = "<h2>No deck specified.</h2>";
        }
        throw new Error("Missing deck parameter");
    }

    // Get the base path - this should be the directory of the markdown file
    const basePath = file.substring(0, file.lastIndexOf("/") + 1);
    const storageKey = `reveal-pos-${file}`;

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
    //  MARKDOWN PROCESSING - FIXED
    // ============================================================

    function rewriteRelativeUrls(markdown) {
        const lines = markdown.split('\n');
        let inCodeBlock = false;
        let result = [];

        for (let line of lines) {
            const trimmed = line.trim();

            if (trimmed.startsWith('```') && (trimmed.length === 3 || trimmed.startsWith('```'))) {
                inCodeBlock = !inCodeBlock;
                result.push(line);
                continue;
            }

            if (!inCodeBlock) {
                // Fix image paths - handle all cases properly
                line = line.replace(
                    /!\[([^\]]*)\]\(([^)]+)\)/g,
                    (match, alt, url) => {
                        // Skip if URL is absolute or external
                        if (url.match(/^https?:\/\//) || url.startsWith('/') || url.startsWith('#')) {
                            return match;
                        }
                        
                        // Skip data URIs
                        if (url.startsWith('data:')) {
                            return match;
                        }

                        // Clean up the URL
                        let cleanUrl = url.replace(/^\.\//, '');
                        
                        // If URL already contains content/ or starts with ../content/
                        if (cleanUrl.includes('content/') || cleanUrl.startsWith('../content/')) {
                            // Keep it as-is - it's already correct
                            return match;
                        }
                        
                        // If URL contains ../framework/images/, extract just the filename
                        if (cleanUrl.includes('framework/images/')) {
                            const filename = cleanUrl.split('/').pop();
                            return `![${alt}](${basePath}images/${filename})`;
                        }
                        
                        // If URL starts with images/, it's relative to markdown file
                        if (cleanUrl.startsWith('images/')) {
                            return `![${alt}](${basePath}${cleanUrl})`;
                        }
                        
                        // If URL starts with ../, keep it as-is
                        if (cleanUrl.startsWith('../')) {
                            return match;
                        }
                        
                        // Default: prepend base path
                        return `![${alt}](${basePath}${cleanUrl})`;
                    }
                );

                // Fix link paths
                line = line.replace(
                    /\[([^\]]+)\]\((?!https?:\/\/|\/|#|mailto:)([^)]+?)\)/g,
                    (match, text, url) => {
                        if (!text || text.trim() === '' || text === '()' || text === '[]') {
                            return match;
                        }
                        // Skip if URL already has a protocol or is absolute
                        if (url.match(/^https?:\/\//) || url.startsWith('/') || url.startsWith('#')) {
                            return match;
                        }
                        // If URL already contains content/ or starts with ../content/
                        if (url.includes('content/') || url.startsWith('../content/')) {
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
        if (!host) {
            return;
        }
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
        if (typeof Reveal === 'undefined' || !footerHost) return;
        
        const currentSlide = Reveal.getCurrentSlide();
        if (!currentSlide) {
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

    // ============================================================
    //  PRINT FUNCTIONS
    // ============================================================

    function openPrintVersion() {
        const urlParams = new URLSearchParams(window.location.search);
        const deckPath = urlParams.get('deck');
        
        if (!deckPath) {
            alert('No deck loaded. Cannot open print version.');
            return;
        }
        
        let slideIndex = 0;
        if (typeof Reveal !== 'undefined') {
            const indices = Reveal.getIndices();
            slideIndex = indices.h || 0;
        }
        
        const printUrl = `print.html?deck=${deckPath}#/markdown-slide/${slideIndex}`;
        window.open(printUrl, '_blank');
    }

    function printSlides() {
        if (typeof Reveal !== 'undefined') {
            document.querySelectorAll('.fragment').forEach(el => {
                el.style.opacity = '1';
                el.style.visibility = 'visible';
                el.style.display = 'block';
            });
        }
        
        enterPrintMode();
        
        setTimeout(() => {
            window.print();
        }, 300);
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
        
        if (typeof Reveal !== 'undefined') {
            setTimeout(() => {
                Reveal.layout();
            }, 100);
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
        
        if (typeof Reveal !== 'undefined') {
            setTimeout(() => {
                Reveal.layout();
            }, 100);
        }
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
        const searchBtn = document.getElementById(BUTTON_IDS.search);
        if (searchBtn) searchBtn.addEventListener("click", openSearch);
        
        const homeBtn = document.getElementById(BUTTON_IDS.home);
        if (homeBtn) {
            homeBtn.addEventListener("click", () => {
                window.location.href = "index.html";
            });
        }
        
        const prevBtn = document.getElementById(BUTTON_IDS.prev);
        if (prevBtn && typeof Reveal !== 'undefined') {
            prevBtn.addEventListener("click", () => Reveal.prev());
        }
        
        const nextBtn = document.getElementById(BUTTON_IDS.next);
        if (nextBtn && typeof Reveal !== 'undefined') {
            nextBtn.addEventListener("click", () => Reveal.next());
        }
        
        const printBtn = document.getElementById(BUTTON_IDS.print);
        if (printBtn) {
            printBtn.addEventListener("click", openPrintVersion);
            printBtn.title = "Open Print Version (2 slides per page with notes)";
        }
        
        const fullscreenBtn = document.getElementById(BUTTON_IDS.fullscreen);
        if (fullscreenBtn) fullscreenBtn.addEventListener("click", toggleFullscreen);

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
        if (typeof Reveal === 'undefined') return;
        
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

            const plugins = [
                RevealMarkdown,
                RevealNotes,
                RevealHighlight,
                RevealSearch
            ];

            if (typeof RevealMenu !== 'undefined') {
                plugins.push(RevealMenu);
            } else if (typeof window.RevealMenu !== 'undefined') {
                plugins.push(window.RevealMenu);
            } else {
                const allGlobalKeys = Object.keys(window);
                const menuKey = allGlobalKeys.find(key => 
                    key.toLowerCase().includes('menu') && 
                    typeof window[key] === 'function'
                );
                if (menuKey) {
                    plugins.push(window[menuKey]);
                }
            }

            if (typeof RevealChalkboard !== 'undefined') {
                plugins.push(RevealChalkboard);
            } else if (typeof window.RevealChalkboard !== 'undefined') {
                plugins.push(window.RevealChalkboard);
            } else {
                const allGlobalKeys = Object.keys(window);
                const chalkboardKey = allGlobalKeys.find(key => 
                    key.toLowerCase().includes('chalkboard') && 
                    typeof window[key] === 'function'
                );
                if (chalkboardKey) {
                    plugins.push(window[chalkboardKey]);
                }
            }

            const fullConfig = {
                ...REVEAL_CONFIG,
                plugins: plugins,
                chalkboard: CHALKBOARD_CONFIG,
                menu: MENU_CONFIG
            };
            
            Reveal.initialize(fullConfig);

            bindToolbar();
            updateFullscreenButton();
            document.addEventListener("fullscreenchange", updateFullscreenButton);
            window.addEventListener("beforeprint", enterPrintMode);
            window.addEventListener("afterprint", exitPrintMode);

            Reveal.on('ready', () => {
                setTimeout(() => {
                    Reveal.layout();
                }, 100);
            });
        })
        .catch(error => {
            const host = document.getElementById(MARKDOWN_HOST_ID);
            if (host) {
                host.innerHTML = `<h2>Error loading slide</h2><p>${error.message}</p>`;
            }
        });
})();