chrome.runtime.sendMessage({}, (response) => {
    var checkReady = setInterval(() => {
        if (document.readyState === "complete") {
            clearInterval(checkReady)
        }
    })
})

let title;
new MutationObserver(function (mutations) {
    title = document.title;
    removeAds();
}).observe(
    document.querySelector('title'),
    { subtree: true, characterData: true, childList: true }
);


let pointer;


const removeAds = async () => {
    if (title.includes("Advertisement")) {
        sessionStorage.setItem("refreshed", "true");
        window.location.reload();
    } else {
        const elems = document.getElementsByClassName("SzCNXJJQz7BiDOO0B2Xv");
        if (elems && elems.length > 0) {
            const rowIndex = elems[0].parentElement.ariaRowIndex;
            sessionStorage.setItem("rowIndex", rowIndex);
        }
    }

}


const playLastSong = () => {
    if (sessionStorage.getItem("refreshed") === "true") {
        const rowIndex = parseInt(sessionStorage.getItem("rowIndex"));
        const nextSongIndex = rowIndex + 1;
        const elems = document.querySelectorAll(`[aria-rowindex = "${nextSongIndex}"]`);
        const elem = elems[0]
        const playButton = elem.getElementsByTagName("button")[0];
        playButton.click();
        sessionStorage.removeItem("refreshed");
        return;
    }
    setTimeout(playLastSong, 2000);
}



document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        playLastSong();
    }
}