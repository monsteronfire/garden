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

    if (isSafari()) {
        document.querySelector('#sitevideo-fallback').style.display = 'block';
        document.querySelector('#sitevideo-video').style.display = 'none';
    }

})()
