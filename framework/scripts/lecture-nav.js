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
                        // IMPORTANT: Include content/ in the path
                        url: `./slide.html?deck=../content/${module.folder}/${lecture.file}`
                    });
                });
            });

            console.log('All lectures loaded:', allLectures);
            console.log('First lecture URL:', allLectures[0]?.url);

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
        
        console.log('Looking for lecture with deck path:', deckPath);
        
        if (!deckPath) {
            console.log('No deck parameter found');
            return;
        }

        // Extract just the filename from the deck path
        const pathFile = deckPath.split('/').pop();
        console.log('Looking for filename:', pathFile);
        
        // Try to find by filename match
        let found = false;
        allLectures.forEach((item, idx) => {
            const itemFile = item.lecture.file;
            
            if (itemFile === pathFile) {
                currentIndex = idx;
                found = true;
                console.log(`Found match at index ${idx}:`, item);
                console.log(`URL for this lecture: ${item.url}`);
            }
        });

        if (!found) {
            console.log('No matching lecture found');
            // Log all available lecture filenames for debugging
            console.log('Available lectures:', allLectures.map(l => l.lecture.file));
        }
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

        console.log('Navigation buttons found:', {
            homeBtn: !!homeBtn,
            prevLectureBtn: !!prevLectureBtn,
            nextLectureBtn: !!nextLectureBtn,
            prevSlideBtn: !!prevSlideBtn,
            nextSlideBtn: !!nextSlideBtn
        });

        // Update lecture navigation buttons
        updateLectureButtons(prevLectureBtn, nextLectureBtn);

        // Lecture navigation click handlers
        if (prevLectureBtn) {
            prevLectureBtn.onclick = () => {
                console.log('Prev lecture clicked, current index:', currentIndex);
                if (currentIndex > 0) {
                    const url = allLectures[currentIndex - 1].url;
                    console.log('Navigating to:', url);
                    window.location.href = url;
                } else {
                    console.log('No previous lecture available');
                }
            };
        }

        if (nextLectureBtn) {
            nextLectureBtn.onclick = () => {
                console.log('Next lecture clicked, current index:', currentIndex);
                
                // If we haven't found the current lecture, try to find it
                if (currentIndex === -1) {
                    console.log('Current lecture not found, attempting to find it...');
                    findCurrentLecture();
                }
                
                if (currentIndex < allLectures.length - 1 && currentIndex >= 0) {
                    const url = allLectures[currentIndex + 1].url;
                    console.log('Navigating to:', url);
                    window.location.href = url;
                } else {
                    console.log('No next lecture available');
                }
            };
        }

        // Home button - go to course home (framework index.html)
        if (homeBtn) {
            homeBtn.onclick = () => {
                window.location.href = 'index.html';
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
                    const url = allLectures[currentIndex - 1].url;
                    console.log('Keyboard: Navigating to:', url);
                    window.location.href = url;
                }
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowRight') {
                e.preventDefault();
                if (currentIndex < allLectures.length - 1 && currentIndex >= 0) {
                    const url = allLectures[currentIndex + 1].url;
                    console.log('Keyboard: Navigating to:', url);
                    window.location.href = url;
                }
            }
        });
    }

    /**
     * Update lecture button states
     */
    function updateLectureButtons(prevBtn, nextBtn) {
        const hasPrev = currentIndex > 0;
        const hasNext = currentIndex < allLectures.length - 1 && currentIndex >= 0;

        console.log('Updating buttons:', { hasPrev, hasNext, currentIndex, total: allLectures.length });

        if (prevBtn) {
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
        allLectures: () => allLectures,
        currentIndex: () => currentIndex,
        getCurrent: () => currentIndex >= 0 ? allLectures[currentIndex] : null,
        getNext: () => currentIndex < allLectures.length - 1 && currentIndex >= 0 ? allLectures[currentIndex + 1] : null,
        getPrev: () => currentIndex > 0 ? allLectures[currentIndex - 1] : null
    };

    // Auto-initialize
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM loaded, initializing lecture nav...');
        loadManifest();
    });

    // Also try when Reveal is ready
    if (typeof Reveal !== 'undefined') {
        Reveal.on('ready', () => {
            if (!manifestData) {
                console.log('Reveal ready, loading manifest...');
                loadManifest();
            }
        });
    }

})(window);