(function () {

    const MARKDOWN_HOST_ID = "markdown-slide";
    const FOOTER_HOST_ID = "fixed-footer";
    const FULLSCREEN_BUTTON_ID = "fullscreenBtn";

    const BUTTON_IDS = {
        search: "searchBtn",
        menu: "menuBtn",
        chalk: "chalkBtn",
        notes: "notesBtn",
        home: "homeBtn",
        prev: "prevBtn",
        next: "nextBtn",
        print: "printBtn",
        fullscreen: "fullscreenBtn"
    };

    const file = new URLSearchParams(window.location.search).get("deck");

    if (!file) {
        document.getElementById(MARKDOWN_HOST_ID).innerHTML =
            "<h2>No deck specified.</h2>";
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

        document
            .querySelectorAll(".print-slide-footer")
            .forEach(node => node.remove());
    }

    function preparePrintFooters() {

        clearPrintFooters();

        document
            .querySelectorAll(".reveal .slides section")
            .forEach(section => {

                const sourceFooter =
                    section.querySelector(".slide-footer");

                if (!sourceFooter) {
                    return;
                }

                const printFooter =
                    sourceFooter.cloneNode(true);

                printFooter.classList.add("print-slide-footer");

                section.appendChild(printFooter);
            });
    }

    function bindToolbar() {

        document
            .getElementById(BUTTON_IDS.search)
            .addEventListener("click", openSearch);

        document
            .getElementById(BUTTON_IDS.menu)
            .addEventListener("click", () => {

                const menu = Reveal.getPlugin("menu");

                if (menu && typeof menu.toggle === "function") {
                    menu.toggle();
                }
            });

        document
            .getElementById(BUTTON_IDS.notes)
            .addEventListener("click", () => {

                if (window.RevealChalkboard) {
                    RevealChalkboard.toggleNotesCanvas();
                }
            });

        document
            .getElementById(BUTTON_IDS.home)
            .addEventListener("click", () => {

                window.location.href = "index.html";
            });

        document
            .getElementById(BUTTON_IDS.prev)
            .addEventListener("click", () => Reveal.prev());

        document
            .getElementById(BUTTON_IDS.next)
            .addEventListener("click", () => Reveal.next());

        document
            .getElementById(BUTTON_IDS.print)
            .addEventListener("click", printSlides);

        document
            .getElementById(BUTTON_IDS.fullscreen)
            .addEventListener("click", toggleFullscreen);
    }

    function wireRevealEvents() {

        Reveal.on("slidechanged", () => {

            localStorage.setItem(
                storageKey,
                JSON.stringify(Reveal.getIndices())
            );

            syncFixedFooter();
        });

        Reveal.on("ready", () => {

            const saved =
                localStorage.getItem(storageKey);

            if (saved) {

                const pos = JSON.parse(saved);

                Reveal.slide(
                    pos.h,
                    pos.v,
                    pos.f
                );
            }

            syncFixedFooter();
        });
    }

    fetch(file)
        .then(response => response.text())
        .then(markdown => {

            let parsedMarkdown =
                SlideMarkdownParser.normalizeLineEndings(markdown);

            parsedMarkdown =
                rewriteRelativeUrls(parsedMarkdown);

            parsedMarkdown =
                SlideMarkdownParser.parseCustomSyntax(parsedMarkdown);

            renderMarkdown(parsedMarkdown);

            wireRevealEvents();

            Reveal.initialize({

                width: "100%",
                height: "100%",

                center: false,
                margin: 0.10,

                hash: true,

                controls: true,
                progress: true,
                slideNumber: true,

                transition: "none",
                backgroundTransition: "none",
                autoAnimate: false,

                chalkboard: {},

                menu: {

                    side: "left",
                    width: "normal",
                    numbers: false,
                    titleSelector:
                        "h1, h2, h3, h4, h5, h6",

                    useTextContentForMissingTitles: false,
                    hideMissingTitles: false,
                    markers: true,

                    custom: false,
                    themes: false,
                    themesPath: "dist/theme/",
                    transitions: false,

                    openButton: false,
                    openSlideNumber: false,

                    keyboard: true,
                    sticky: false,
                    autoOpen: true,

                    delayInit: false,
                    openOnInit: false,

                    loadIcons: true
                },

                plugins: [
                    RevealMarkdown,
                    RevealNotes,
                    RevealHighlight,
                    RevealSearch,
                    RevealMenu,
                    RevealChalkboard
                ]
            });

            bindToolbar();

            updateFullscreenButton();

            document.addEventListener(
                "fullscreenchange",
                updateFullscreenButton
            );

            window.addEventListener(
                "beforeprint",
                enterPrintMode
            );

            window.addEventListener(
                "afterprint",
                exitPrintMode
            );
        })
        .catch(error => {

            console.error(
                "Error loading markdown:",
                error
            );

            document.getElementById(
                MARKDOWN_HOST_ID
            ).innerHTML =
                `<h2>Error loading slide</h2><p>${error.message}</p>`;
        });

}());