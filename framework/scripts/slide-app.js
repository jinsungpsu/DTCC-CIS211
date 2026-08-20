(function () {
    const MARKDOWN_HOST_ID = "markdown-slide";
    const FOOTER_HOST_ID = "fixed-footer";
    const FULLSCREEN_BUTTON_ID = "fullscreenBtn";
    const BUTTON_IDS = {
        search: "searchBtn",
        home: "homeBtn",
        prev: "prevBtn",
        next: "nextBtn",
        print: "printBtn",
        fullscreen: "fullscreenBtn"
    };

    const file = new URLSearchParams(window.location.search).get("deck");

    if (!file) {
        document.getElementById(MARKDOWN_HOST_ID).innerHTML = "<h2>No deck specified.</h2>";
        throw new Error("Missing deck parameter");
    }

    const basePath = file.substring(0, file.lastIndexOf("/") + 1);
    const storageKey = `reveal-pos-${file}`;

    function rewriteRelativeUrls(markdown) {
        return markdown.replace(
            /\]\((?!https?:\/\/|\/|#|mailto:)(.*?)\)/g,
            (match, url) => `](${basePath}${url})`
        );
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

    function updateFullscreenButton() {
        const btn = document.getElementById(FULLSCREEN_BUTTON_ID);
        if (!btn) {
            return;
        }

        if (document.fullscreenElement) {
            document.body.classList.add("fullscreen-mode");
            btn.innerHTML = "✕";
            btn.title = "Exit Fullscreen";
        } else {
            document.body.classList.remove("fullscreen-mode");
            btn.innerHTML = "⛶ Fullscreen";
            btn.title = "Enter Fullscreen";
        }
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            return;
        }

        document.exitFullscreen();
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

    function printSlides() {
        enterPrintMode();
        window.print();
    }

    function clearPrintFooters() {
        document.querySelectorAll(".print-slide-footer").forEach(node => node.remove());
    }

    function preparePrintFooters() {
        clearPrintFooters();
        document.querySelectorAll(".reveal .slides section").forEach(section => {
            const sourceFooter = section.querySelector(".slide-footer");
            if (!sourceFooter) {
                return;
            }

            const printFooter = sourceFooter.cloneNode(true);
            printFooter.classList.add("print-slide-footer");
            section.appendChild(printFooter);
        });
    }

    function bindToolbar() {
        document.getElementById(BUTTON_IDS.search).addEventListener("click", openSearch);
        document.getElementById(BUTTON_IDS.home).addEventListener("click", () => {
            window.location.href = "index.html";
        });
        document.getElementById(BUTTON_IDS.prev).addEventListener("click", () => Reveal.prev());
        document.getElementById(BUTTON_IDS.next).addEventListener("click", () => Reveal.next());
        document.getElementById(BUTTON_IDS.print).addEventListener("click", printSlides);
        document.getElementById(BUTTON_IDS.fullscreen).addEventListener("click", toggleFullscreen);
    }

    function wireRevealEvents() {
        Reveal.on("slidechanged", () => {
            localStorage.setItem(storageKey, JSON.stringify(Reveal.getIndices()));
            syncFixedFooter();
        });

        Reveal.on("ready", () => {
            syncFixedFooter();
            const saved = localStorage.getItem(storageKey);
            if (!saved) {
                return;
            }

            const pos = JSON.parse(saved);
            Reveal.slide(pos.h, pos.v, pos.f);
            syncFixedFooter();
        });
    }

    fetch(file)
        .then(response => response.text())
        .then(markdown => {
            let parsedMarkdown = SlideMarkdownParser.normalizeLineEndings(markdown);
            parsedMarkdown = rewriteRelativeUrls(parsedMarkdown);
            parsedMarkdown = SlideMarkdownParser.parseCustomSyntax(parsedMarkdown);

            renderMarkdown(parsedMarkdown);
            wireRevealEvents();

            Reveal.initialize({
                width: '100%',
                height: '100%',
                center: false,
                margin: 0.10,
                hash: true,
                controls: true,
                progress: true,
                slideNumber: true,
                transition: "none",
                backgroundTransition: 'none',
                autoAnimate: false,
                customcontrols: {
                    controls: [
                        {
                            icon: '<i class="fa fa-pen"></i>',
                            title: 'Toggle notes canvas (C)',
                            action: 'RevealChalkboard.toggleNotesCanvas();'
                        }
                    ]
                },
                chalkboard: {
                    // add configuration here
                },
                menu: {
                    // Specifies which side of the presentation the menu will
                    // be shown. Use 'left' or 'right'.
                    side: 'left',

                    // Specifies the width of the menu.
                    // Can be one of the following:
                    // 'normal', 'wide', 'third', 'half', 'full', or
                    // any valid css length value
                    width: 'normal',

                    // Add slide numbers to the titles in the slide list.
                    // Use 'true' or format string (same as reveal.js slide numbers)
                    numbers: false,

                    // Specifies which slide elements will be used for generating
                    // the slide titles in the menu. The default selects the first
                    // heading element found in the slide, but you can specify any
                    // valid css selector and the text from the first matching
                    // element will be used.
                    // Note: that a section data-menu-title attribute or an element
                    // with a menu-title class will take precedence over this option
                    titleSelector: 'h1, h2, h3, h4, h5, h6',

                    // If slides do not have a matching title, attempt to use the
                    // start of the text content as the title instead
                    useTextContentForMissingTitles: false,

                    // Hide slides from the menu that do not have a title.
                    // Set to 'true' to only list slides with titles.
                    hideMissingTitles: false,

                    // Adds markers to the slide titles to indicate the
                    // progress through the presentation. Set to 'false'
                    // to hide the markers.
                    markers: true,

                    // Specify custom panels to be included in the menu, by
                    // providing an array of objects with 'title', 'icon'
                    // properties, and either a 'src' or 'content' property.
                    custom: false,

                    // Specifies the themes that will be available in the themes
                    // menu panel. Set to 'true' to show the themes menu panel
                    // with the default themes list. Alternatively, provide an
                    // array to specify the themes to make available in the
                    // themes menu panel, for example...
                    //
                    // [
                    //     { name: 'Black', theme: 'dist/theme/black.css' },
                    //     { name: 'White', theme: 'dist/theme/white.css' },
                    //     { name: 'League', theme: 'dist/theme/league.css' },
                    //     {
                    //       name: 'Dark',
                    //       theme: 'lib/reveal.js/dist/theme/black.css',
                    //       highlightTheme: 'lib/reveal.js/plugin/highlight/monokai.css'
                    //     },
                    //     {
                    //       name: 'Code: Zenburn',
                    //       highlightTheme: 'lib/reveal.js/plugin/highlight/zenburn.css'
                    //     }
                    // ]
                    //
                    // Note: specifying highlightTheme without a theme will
                    // change the code highlight theme while leaving the
                    // presentation theme unchanged.
                    themes: false,

                    // Specifies the path to the default theme files. If your
                    // presentation uses a different path to the standard reveal
                    // layout then you need to provide this option, but only
                    // when 'themes' is set to 'true'. If you provide your own
                    // list of themes or 'themes' is set to 'false' the
                    // 'themesPath' option is ignored.
                    themesPath: 'dist/theme/',

                    // Specifies if the transitions menu panel will be shown.
                    // Set to 'true' to show the transitions menu panel with
                    // the default transitions list. Alternatively, provide an
                    // array to specify the transitions to make available in
                    // the transitions panel, for example...
                    // ['None', 'Fade', 'Slide']
                    transitions: false,

                    // Adds a menu button to the slides to open the menu panel.
                    // Set to 'false' to hide the button.
                    openButton: true,

                    // If 'true' allows the slide number in the presentation to
                    // open the menu panel. The reveal.js slideNumber option must
                    // be displayed for this to take effect
                    openSlideNumber: false,

                    // If true allows the user to open and navigate the menu using
                    // the keyboard. Standard keyboard interaction with reveal
                    // will be disabled while the menu is open.
                    keyboard: true,

                    // Normally the menu will close on user actions such as
                    // selecting a menu item, or clicking the presentation area.
                    // If 'true', the sticky option will leave the menu open
                    // until it is explicitly closed, that is, using the close
                    // button or pressing the ESC or m key (when the keyboard
                    // interaction option is enabled).
                    sticky: false,

                    // If 'true' standard menu items will be automatically opened
                    // when navigating using the keyboard. Note: this only takes
                    // effect when both the 'keyboard' and 'sticky' options are enabled.
                    autoOpen: true,

                    // If 'true' the menu will not be created until it is explicitly
                    // requested by calling RevealMenu.init(). Note this will delay
                    // the creation of all menu panels, including custom panels, and
                    // the menu button.
                    delayInit: false,

                    // If 'true' the menu will be shown when the menu is initialised.
                    openOnInit: false,

                    // By default the menu will load it's own font-awesome library
                    // icons. If your presentation needs to load a different
                    // font-awesome library the 'loadIcons' option can be set to false
                    // and the menu will not attempt to load the font-awesome library.
                    loadIcons: true
                },
                plugins: [
                    RevealMarkdown,
                    RevealNotes,
                    RevealHighlight,
                    RevealSearch,
                    RevealMenu,
                    RevealChalkboard,
                    RevealCustomControls
                ]
            });

            bindToolbar();
            updateFullscreenButton();
            document.addEventListener("fullscreenchange", updateFullscreenButton);
            window.addEventListener("beforeprint", enterPrintMode);
            window.addEventListener("afterprint", exitPrintMode);
        })
        .catch(error => {
            console.error("Error loading markdown:", error);
            document.getElementById(MARKDOWN_HOST_ID).innerHTML =
                `<h2>Error loading slide</h2><p>${error.message}</p>`;
        });
}());
