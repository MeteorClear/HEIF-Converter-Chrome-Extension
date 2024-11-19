console.log("[TEST]:: popup.js load");

const dropZone = document.getElementById("drop-zone");
const fileZone = document.getElementById("file-zone");

const convertButton = document.getElementById("convert-button");

["dragenter", "dragover", "dragleave", "drop"].forEach((event) => {
    document.addEventListener(event, (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
});

const supportedExtensions = [".jpeg", ".jpg", ".png", ".heif", ".heic"];
const uploadedFiles = [];

dropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const files = Array.from(event.dataTransfer.files);
    console.log(files);
    const validFiles = files.filter((file) => {
        const extension = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
        return supportedExtensions.includes(extension);
    });
    console.log(validFiles);

    fileZone.innerHTML = "";

    validFiles.forEach((file) => {
        uploadedFiles.push(file);
        const listItem = document.createElement("div");
        const text = document.createTextNode(file.name);
  
        listItem.appendChild(text);
        fileZone.appendChild(listItem);
    });
});

convertButton.addEventListener("click", async () => {
    if (uploadedFiles.length === 0) return;

    // serialize file
    const serializedFiles = await Promise.all(
        uploadedFiles.map(async (file) => ({
            name: file.name,
            size: file.size,
            base64: await fileToBase64(file)
        }))
    );

    chrome.runtime.sendMessage({ action: "convertFiles", files: serializedFiles }, (response) => {
        if (chrome.runtime.lastError) {
            console.error("[Popup.js] Runtime Error:", chrome.runtime.lastError.message);
            return;
        }

        if (response.success) {
            console.log("Files converted and downloaded successfully!");
        } else {
            console.error("Error converting files.");
        }
    });
});

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]); // base64 section
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}