let title;
new MutationObserver(function (mutations) {
    title = document.title;
    removeAds();
}).observe(
    document.querySelector('title'),
    { subtree: true, characterData: true, childList: true }
);



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
    const rowIndex = parseInt(sessionStorage.getItem("rowIndex"));
    const nextSongIndex = rowIndex + 1;
    const elems = document.querySelectorAll(`[aria-rowindex = "${nextSongIndex}"]`);
    if (elems && elems.length === 0) {
        chrome.runtime.sendMessage({ type: "focus-window" })
        setTimeout(playLastSong, 2000);
        return;
    }
    const elem = elems[0];
    const playButton = elem.getElementsByTagName("button")[0];
    playButton.click();
    sessionStorage.removeItem("refreshed");
}



const byPassAdvertisement = () => {
    if (sessionStorage.getItem("refreshed") === "true") {
        playLastSong();
    }
}



document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        byPassAdvertisement();
    }
}