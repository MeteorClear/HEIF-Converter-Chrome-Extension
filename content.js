console.log("[TEST]:: content.js load");

const scriptSrc = chrome.runtime.getURL('lib/bundle.js');

document.addEventListener("DOMContentLoaded", () => {
    const scriptTop = document.createElement('script');
    scriptTop.src = scriptSrc;

    (document.head || document.body).appendChild(scriptTop);
});

async function decodeHEIF(file) {
    // some magic - decode
    return;
}

async function encodeHEIF(file) {
    // some magic - encode
    return;
}

function downloadFile(file) {
    // some magic - file download
    return;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("[Content.js] Received message:", message);

    if (message.action === "convertFiles") {
        const files = message.files;
        console.log(files);

        files.forEach(async (file) => {
            console.log("[Content.js] Processing File,", file);
            const extension = file.name.toLowerCase().slice(file.name.lastIndexOf("."));

            if ([".jpeg", ".jpg", ".png"].includes(extension)) {
                console.log("[Content.js] Encode HEIF,", file.name);
                encodeHEIF(file);
                // some magic
            } else if ([".heif", ".heic"].includes(extension)) {
                console.log("[Content.js] Decode HEIF,", file.name);
                decodeHEIF(file);
                // some magic
            } else {
                console.error("unknown extension", extension);
            }

            downloadFile(file);
        });

        sendResponse({ success: true });
        return true;
    }

    return false;
});