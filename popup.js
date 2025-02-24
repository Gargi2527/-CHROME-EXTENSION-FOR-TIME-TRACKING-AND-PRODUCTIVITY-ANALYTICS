document.addEventListener("DOMContentLoaded", () => {
    const reportList = document.getElementById("report");
    chrome.storage.local.get(["timeData"], (result) => {
        const timeData = result.timeData || {};
        reportList.innerHTML = "";

        for (const [site, time] of Object.entries(timeData)) {
            const li = document.createElement("li");
            li.textContent = `${site}: ${Math.round(time)} sec`;
            reportList.appendChild(li);
        }
    });

    document.getElementById("viewDashboard").addEventListener("click", () => {
        chrome.tabs.create({ url: chrome.runtime.getURL("dashboard.html") });
    });
});
