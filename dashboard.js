const productiveSites = ["github.com", "stackoverflow.com", "docs.google.com"];
const unproductiveSites = ["youtube.com", "facebook.com", "twitter.com"];

document.addEventListener("DOMContentLoaded", () => {
    const reportList = document.getElementById("report");
    chrome.storage.local.get(["timeData"], (result) => {
        const timeData = result.timeData || {};
        reportList.innerHTML = "";

        for (const [site, time] of Object.entries(timeData)) {
            const li = document.createElement("li");
            li.textContent = `${site}: ${Math.round(time)} sec`;

            if (productiveSites.includes(site)) {
                li.classList.add("productive");
            } else if (unproductiveSites.includes(site)) {
                li.classList.add("unproductive");
            }
            reportList.appendChild(li);
        }
    });
});
