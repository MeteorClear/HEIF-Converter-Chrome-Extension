console.log("[TEST]:: content.js load");

const scriptSrc = chrome.runtime.getURL('lib/bundle.js');

document.addEventListener("DOMContentLoaded", () => {
    const scriptTop = document.createElement('script');
    scriptTop.src = scriptSrc;

    (document.head || document.body).appendChild(scriptTop);
});