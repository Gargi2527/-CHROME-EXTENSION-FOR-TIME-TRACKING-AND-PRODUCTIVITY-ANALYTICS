let activeTab = null;
let startTime = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    trackTime(tab.url);
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        trackTime(tab.url);
    }
});

function trackTime(url) {
    if (!url || !url.startsWith("http")) return;

    if (activeTab) {
        const timeSpent = (Date.now() - startTime) / 1000;
        chrome.storage.local.get(["timeData"], (result) => {
            let timeData = result.timeData || {};
            const hostname = new URL(activeTab).hostname;

            timeData[hostname] = (timeData[hostname] || 0) + timeSpent;
            chrome.storage.local.set({ timeData });
        });
    }

    activeTab = url;
    startTime = Date.now();
}

chrome.runtime.onSuspend.addListener(() => {
    if (activeTab) {
        const timeSpent = (Date.now() - startTime) / 1000;
        chrome.storage.local.get(["timeData"], (result) => {
            let timeData = result.timeData || {};
            const hostname = new URL(activeTab).hostname;

            timeData[hostname] = (timeData[hostname] || 0) + timeSpent;
            chrome.storage.local.set({ timeData });
        });
    }
});
