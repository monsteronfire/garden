(() => {
    const tocToggle = document.getElementById('table-of-contents-toggle');
    const toc = document.getElementById('TableOfContents');
    const mq = window.matchMedia('(max-width: 767px)');

    // Hide TOC by default on small screens
    if (mq.matches && toc) {
        toc.classList.add('hidden');
    }

    function setupToggle() {
        if (mq.matches && tocToggle && toc) {
            tocToggle.addEventListener('click', () => {
                toc.classList.toggle('hidden');
            });

            // Close TOC when any child link is clicked
            toc.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    toc.classList.add('hidden');
                });
            });
        }
    }

    setupToggle();

    mq.addEventListener('change', () => {
        if (mq.matches && toc) {
            toc.classList.add('hidden');
        } else if (toc) {
            toc.classList.remove('hidden');
        }
        setupToggle();
    });
})()
