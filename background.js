chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "track-time" && message.duration > 0) {
    const today = new Date().toISOString().split("T")[0];

    chrome.storage.local.get("timeSpent", (data) => {
      const timeSpent = data.timeSpent || {};

      if (!timeSpent[today]) {
        timeSpent[today] = {};
      }

      timeSpent[today][message.host] =
        (timeSpent[today][message.host] || 0) + message.duration;

      chrome.storage.local.set({ timeSpent });
    });
  }
});
