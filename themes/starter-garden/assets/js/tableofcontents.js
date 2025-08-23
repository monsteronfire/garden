(() => {
    const tocToggle = document.getElementById('table-of-contents-toggle');
    const toc = document.getElementById('TableOfContents');
    const mq = window.matchMedia('(max-width: 767px)');

    // Hide TOC by default on small screens
    if (mq.matches && toc) {
        toc.classList.add('hidden');
        tocToggle.classList.remove('open');
    }

    function setupToggle() {
        if (mq.matches && tocToggle && toc) {
            tocToggle.addEventListener('click', () => {
                toc.classList.toggle('hidden');
                tocToggle.classList.toggle('open', !toc.classList.contains('hidden'));
            });

            toc.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    toc.classList.add('hidden');
                    tocToggle.classList.remove('open');
                });
            });
        }
    }

    setupToggle();

    mq.addEventListener('change', () => {
        if (mq.matches && toc) {
            toc.classList.add('hidden');
            tocToggle.classList.remove('open');
        } else if (toc) {
            toc.classList.remove('hidden');
            tocToggle.classList.remove('open');
        }
        setupToggle();
    });
})()
