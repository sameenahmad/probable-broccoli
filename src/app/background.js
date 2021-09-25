const getActiveTab = () => new Promise((resolve, reject) => {
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true,
        },
        (tabArr) => {
            if (tabArr.length === 0) {
                const e = new Error("No tabs matching query");
                e.name = "NoMatchingTabsError";
                return reject(e);
            }
            const currTab = tabArr[0];
            return resolve(currTab);
        }
    );
});


const focusSpotifyWindow = async (sender) => {
    let activeTab;
    try {
        activeTab = await getActiveTab();
        if (!activeTab) {
            throw new Error("Internal tab");
        }
    }
    catch (err) {
        setTimeout(focusSpotifyWindow, 1000);
        return;
    }
    const tabId = sender.tab.id;
    const updateProperties = { 'active': true };
    chrome.tabs.update(tabId, updateProperties, (tab) => {
        chrome.tabs.update(activeTab.id, updateProperties, () => {
        })
    });
}


chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message && message.type === "focus-window") {
        focusSpotifyWindow(sender);
    }
})

