(() => {
    function isSafari() {
        let userAgentString = navigator.userAgent;
        // Chrome agent - needed to elinimate Chrome since Chrome browsers include both Chrome and Safari user agent string
        let chromeAgent = userAgentString.indexOf("Chrome") > -1;
        // Detect Safari
        let safariAgent = userAgentString.indexOf("Safari") > -1;

        // Discard Safari since it also matches Chrome
        if ((chromeAgent) && (safariAgent)) safariAgent = false;

        return safariAgent
    }

    const video = document.getElementById('sitevideo-video');
    const fallback = document.getElementById('sitevideo-fallback');

    if (isSafari()) {
        fallback.style.display = 'block';
        video.style.display = 'none';
    } else if (video && fallback) {
        video.addEventListener('canplay', function () {
            fallback.style.display = 'none';
            video.style.display = 'block';
        });
    }

})()
