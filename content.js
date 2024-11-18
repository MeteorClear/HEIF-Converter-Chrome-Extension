console.log("[TEST]:: content.js load");


const scriptSrc = chrome.runtime.getURL('lib/bundle.js');
console.log(scriptSrc);

document.addEventListener("DOMContentLoaded", () => {
    const scriptTop = document.createElement('script');
    scriptTop.src = scriptSrc;

    // Append the script to the <head> if it exists, otherwise to <body>
    (document.head || document.body).appendChild(scriptTop);
});