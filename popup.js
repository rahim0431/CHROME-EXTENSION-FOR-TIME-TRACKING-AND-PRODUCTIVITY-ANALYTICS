function formatTime(minutes) {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs}h ${mins}m`;
}

function updateStats() {
  chrome.storage.local.get("timeSpent", (data) => {
    const statsList = document.getElementById("stats");
    statsList.innerHTML = "";

    const timeSpent = data.timeSpent || {};
    let productive = 0;
    let unproductive = 0;

    Object.keys(timeSpent).forEach((day) => {
      const sites = timeSpent[day];
      Object.keys(sites).forEach((site) => {
        const mins = sites[site];
        if (site.includes("leetcode") || site.includes("github")) {
          productive += mins;
        } else if (
          site.includes("youtube") ||
          site.includes("facebook") ||
          site.includes("instagram")
        ) {
          unproductive += mins;
        }
      });
    });

    const prodLi = document.createElement("li");
    prodLi.textContent = `✅ Productive: ${formatTime(productive)}`;
    statsList.appendChild(prodLi);

    const unprodLi = document.createElement("li");
    unprodLi.textContent = `❌ Unproductive: ${formatTime(unproductive)}`;
    statsList.appendChild(unprodLi);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateStats();
  document
    .getElementById("dashboardBtn")
    .addEventListener("click", () => {
      chrome.tabs.create({
        url: chrome.runtime.getURL("dashboard.html"),
      });
    });
});
