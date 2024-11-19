console.log("[TEST]:: background.js load");

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "convertFiles") {
        console.log("[Background.js] Received message:", message);

        const tab = chrome.tabs.query({ active: true, lastFocusedWindow: true });
        console.log(tab);

        message.files.forEach((file) => {
            console.log(`[Background.js] File Name: ${file.name}`);
            console.log(`[Background.js] Base64 Data: ${file.base64.slice(0, 30)}...`);
        });

        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
            console.log(tabs);
            if (!tabs || tabs.length === 0) {
                console.error("[Background.js] No active tabs found.");
                sendResponse({ success: false });
                return;
            }

            chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
                if (chrome.runtime.lastError) {
                    console.error("[Background.js] Runtime Error:", chrome.runtime.lastError.message);
                    sendResponse({ success: false });
                    return;
                }

                sendResponse(response);
            });
        });

        return true;
    }
});

