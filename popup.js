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

convertButton.addEventListener("click", () => {
    if (uploadedFiles.length === 0) return;

    chrome.runtime.sendMessage({ action: "convertFiles", files: uploadedFiles }, (response) => {
        if (response.success) {
            console.log("Files converted and downloaded successfully!");
        } else {
            console.error("Error converting files.");
        }
    });
});