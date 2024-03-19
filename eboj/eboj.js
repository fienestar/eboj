show_tier_button()
change_like_box()

function addScript(src) {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL(src);
    document.head.appendChild(script);
}

addScript('set-smart-default-language.js');
