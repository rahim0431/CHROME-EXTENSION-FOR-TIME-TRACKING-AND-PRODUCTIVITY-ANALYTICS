let lastPing = Date.now();

setInterval(() => {
  const hostname = window.location.hostname;
  const diff = Math.floor((Date.now() - lastPing) / 60000);
  if (diff > 0) {
    chrome.runtime.sendMessage({
      type: "track-time",
      host: hostname,
      duration: diff
    });
    lastPing = Date.now();
  }
}, 30000);
