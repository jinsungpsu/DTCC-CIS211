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

    function bindToolbar() {
        document.getElementById(BUTTON_IDS.search).addEventListener("click", openSearch);
        document.getElementById(BUTTON_IDS.home).addEventListener("click", () => {
            window.location.href = "index.html";
        });
        document.getElementById(BUTTON_IDS.prev).addEventListener("click", () => Reveal.prev());
        document.getElementById(BUTTON_IDS.next).addEventListener("click", () => Reveal.next());
        document.getElementById(BUTTON_IDS.print).addEventListener("click", () => window.print());
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
                hash: true,
                controls: true,
                progress: true,
                slideNumber: true,
                plugins: [
                    RevealMarkdown,
                    RevealNotes,
                    RevealHighlight,
                    RevealSearch
                ]
            });

            bindToolbar();
            updateFullscreenButton();
            document.addEventListener("fullscreenchange", updateFullscreenButton);
        })
        .catch(error => {
            console.error("Error loading markdown:", error);
            document.getElementById(MARKDOWN_HOST_ID).innerHTML =
                `<h2>Error loading slide</h2><p>${error.message}</p>`;
        });
}());
