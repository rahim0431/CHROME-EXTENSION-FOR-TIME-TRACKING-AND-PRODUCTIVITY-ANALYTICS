const productiveSites = ["github.com", "leetcode.com", "stackoverflow.com"];
const unproductiveSites = ["facebook.com", "instagram.com", "youtube.com"];

function formatTime(minutes) {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs}h ${mins}m`;
}

chrome.storage.local.get("timeSpent", (data) => {
  const timeSpent = data.timeSpent || {};
  const last7Days = Object.keys(timeSpent).slice(-7);

  let productive = 0;
  let unproductive = 0;
  const siteTotals = {};

  last7Days.forEach((day) => {
    const sites = timeSpent[day];
    Object.keys(sites).forEach((site) => {
      const mins = sites[site];
      siteTotals[site] = (siteTotals[site] || 0) + mins;

      if (productiveSites.some((p) => site.includes(p))) {
        productive += mins;
      } else if (unproductiveSites.some((u) => site.includes(u))) {
        unproductive += mins;
      }
    });
  });

  // Pie Chart
  new Chart(document.getElementById("productivityChart"), {
    type: "pie",
    data: {
      labels: ["Productive", "Unproductive"],
      datasets: [
        {
          data: [productive, unproductive],
          backgroundColor: ["#28a745", "#dc3545"]
        }
      ]
    }
  });

  // Weekly Table
  const reportTable = document.getElementById("weeklyReport");
  Object.keys(siteTotals).forEach((site) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${site}</td><td>${formatTime(siteTotals[site])}</td>`;
    reportTable.appendChild(tr);
  });
});
