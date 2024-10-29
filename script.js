const params = new URLSearchParams(window.location.search);
const code = params.get('code');

const preTag = document.getElementById("myPreTag");
if (code) {
    preTag.innerText = code;
} else {
    preTag.innerText = "Authorization code not found in the URL.";
}

const copyContainer = document.createElement("div");
copyContainer.classList.add("copy-container");

// SVG for the copy icon
const copyIcon = 
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path>
    </svg>;

// SVG for the checkmark icon
const checkIcon = 
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm">
        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="currentColor"></path>
    </svg>;

copyContainer.innerHTML = ${copyIcon}<span>Copy code</span>;
copyContainer.title = "Copy"; // Đây là dòng thêm title

preTag.appendChild(copyContainer);

copyContainer.addEventListener("click", () => {
    copyContainer.style.display = "none";

    const range = document.createRange();
    range.selectNode(preTag);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    try {
        document.execCommand("copy");
        copyContainer.innerHTML = ${checkIcon}<span>Copied!</span>;
        setTimeout(function(){
            copyContainer.innerHTML = ${copyIcon}<span>Copy code</span>;
        }, 2000);
    } catch (err) {
        console.error("Unable to copy text:", err);
    } finally {
        copyContainer.style.display = "flex";
        window.getSelection().removeAllRanges();
    }
});
