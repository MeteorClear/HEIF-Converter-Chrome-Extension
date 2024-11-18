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

dropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const files = Array.from(event.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    fileZone.innerHTML = "";

    imageFiles.forEach((file) => {
        const listItem = document.createElement("div");
        const text = document.createTextNode(file.name);
  
        listItem.appendChild(text);
        fileZone.appendChild(listItem);
    });
});