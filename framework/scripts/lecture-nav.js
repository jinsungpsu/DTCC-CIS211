// framework/scripts/lecture-nav.js
(function(global) {
    'use strict';

    let manifestData = null;
    let allLectures = [];
    let currentIndex = -1;

    /**
     * Load manifest.json
     */
    async function loadManifest() {
        try {
            const response = await fetch('../manifest.json');
            if (!response.ok) throw new Error('Could not load manifest');
            manifestData = await response.json();
            
            // Build flat list of all lectures
            allLectures = [];
            manifestData.modules.forEach(module => {
                module.lectures.forEach(lecture => {
                    allLectures.push({
                        module: module,
                        lecture: lecture,
                        url: `../framework/slide.html?deck=../${module.folder}/${lecture.file}`
                    });
                });
            });

            // Find current lecture
            findCurrentLecture();
            
            // Setup navigation
            setupNavigation();
            
            return true;
        } catch (error) {
            console.error('Error loading manifest:', error);
            return false;
        }
    }

    /**
     * Find current lecture from URL
     */
    function findCurrentLecture() {
        const params = new URLSearchParams(window.location.search);
        const deckPath = params.get('deck');
        
        if (!deckPath) {
            // Try to find from path
            const path = window.location.pathname;
            const match = path.match(/module(\d{2})\/([^\/]+\.md)/);
            if (match) {
                const folder = `module${match[1]}`;
                const file = match[2];
                findLectureByPath(`../${folder}/${file}`);
            }
            return;
        }

        findLectureByPath(deckPath);
    }

    /**
     * Find lecture by path
     */
    function findLectureByPath(path) {
        allLectures.forEach((item, idx) => {
            // Compare just the filename to be safe
            const itemFile = item.lecture.file;
            const pathFile = path.split('/').pop();
            if (itemFile === pathFile) {
                currentIndex = idx;
            }
        });
    }

    /**
     * Setup navigation buttons
     */
    function setupNavigation() {
        // Get buttons from toolbar
        const homeBtn = document.getElementById('homeBtn');
        const prevLectureBtn = document.getElementById('prevLectureBtn');
        const nextLectureBtn = document.getElementById('nextLectureLectureBtn');
        const prevSlideBtn = document.getElementById('prevBtn');
        const nextSlideBtn = document.getElementById('nextBtn');
        const menuBtn = document.getElementById('menuBtn');

        // Update lecture navigation buttons
        updateLectureButtons(prevLectureBtn, nextLectureBtn);

        // Lecture navigation click handlers
        if (prevLectureBtn) {
            prevLectureBtn.onclick = () => {
                if (currentIndex > 0) {
                    window.location.href = allLectures[currentIndex - 1].url;
                }
            };
        }

        if (nextLectureBtn) {
            nextLectureBtn.onclick = () => {
                if (currentIndex < allLectures.length - 1) {
                    window.location.href = allLectures[currentIndex + 1].url;
                }
            };
        }

        // Home button - go to course home
        if (homeBtn) {
            homeBtn.onclick = () => {
                window.location.href = '../index.html';
            };
        }

        // Slide navigation - use Reveal.js controls
        if (prevSlideBtn) {
            prevSlideBtn.onclick = () => {
                if (typeof Reveal !== 'undefined') {
                    Reveal.prev();
                }
            };
        }

        if (nextSlideBtn) {
            nextSlideBtn.onclick = () => {
                if (typeof Reveal !== 'undefined') {
                    Reveal.next();
                }
            };
        }

        // Menu button - toggle menu
        if (menuBtn) {
            menuBtn.onclick = () => {
                if (typeof Reveal !== 'undefined' && Reveal.getPlugin('menu')) {
                    Reveal.getPlugin('menu').toggleMenu();
                }
            };
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl+Left / Ctrl+Right for lectures
            if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowLeft') {
                e.preventDefault();
                if (currentIndex > 0) {
                    window.location.href = allLectures[currentIndex - 1].url;
                }
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowRight') {
                e.preventDefault();
                if (currentIndex < allLectures.length - 1) {
                    window.location.href = allLectures[currentIndex + 1].url;
                }
            }
        });
    }

    /**
     * Update lecture button states
     */
    function updateLectureButtons(prevBtn, nextBtn) {
        if (prevBtn) {
            const hasPrev = currentIndex > 0;
            prevBtn.disabled = !hasPrev;
            prevBtn.style.opacity = hasPrev ? '1' : '0.4';
            prevBtn.style.cursor = hasPrev ? 'pointer' : 'default';
            if (hasPrev) {
                prevBtn.title = `Previous Lecture: ${allLectures[currentIndex - 1].lecture.title}`;
            } else {
                prevBtn.title = 'No previous lecture';
            }
        }

        if (nextBtn) {
            const hasNext = currentIndex < allLectures.length - 1;
            nextBtn.disabled = !hasNext;
            nextBtn.style.opacity = hasNext ? '1' : '0.4';
            nextBtn.style.cursor = hasNext ? 'pointer' : 'default';
            if (hasNext) {
                nextBtn.title = `Next Lecture: ${allLectures[currentIndex + 1].lecture.title}`;
            } else {
                nextBtn.title = 'No next lecture';
            }
        }
    }

    /**
     * Re-initialize navigation (useful if slides change)
     */
    function reinit() {
        findCurrentLecture();
        const prevBtn = document.getElementById('prevLectureBtn');
        const nextBtn = document.getElementById('nextLectureLectureBtn');
        updateLectureButtons(prevBtn, nextBtn);
    }

    // Expose API
    global.LectureNav = {
        loadManifest,
        reinit,
        allLectures,
        currentIndex,
        getCurrent: () => currentIndex >= 0 ? allLectures[currentIndex] : null,
        getNext: () => currentIndex < allLectures.length - 1 ? allLectures[currentIndex + 1] : null,
        getPrev: () => currentIndex > 0 ? allLectures[currentIndex - 1] : null
    };

    // Auto-initialize
    document.addEventListener('DOMContentLoaded', () => {
        loadManifest();
    });

    // Also try when Reveal is ready
    if (typeof Reveal !== 'undefined') {
        Reveal.on('ready', () => {
            if (!manifestData) {
                loadManifest();
            }
        });
    }

})(window);