console.log("[TEST]:: popup.js load");

const dropZone = document.getElementById("drop-zone");
const optionZone = document.getElementById("option-zone");
const fileZone = document.getElementById("file-zone");

["dragenter", "dragover", "dragleave", "drop"].forEach((event) => {
    document.addEventListener(event, (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
});

const supportedExtensions = [".jpeg", ".jpg", ".png", ".heif", ".heic"];

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
        const listItem = document.createElement("div");
        const text = document.createTextNode(file.name);
  
        listItem.appendChild(text);
        fileZone.appendChild(listItem);
    });
});