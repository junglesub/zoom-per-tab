// Apply zoom settings only if the domain is in the whitelist and the extension is enabled
chrome.tabs.onZoomChange.addListener((zoomChangeInfo) => {
  chrome.storage.sync.get(["whitelist", "enabled"], (data) => {
    const enabled = data.enabled !== false; // Default: true
    if (!enabled) return;
    chrome.tabs.get(zoomChangeInfo.tabId, (tab) => {
      if (!tab || !tab.url) return;
      const urlOrigin = (() => {
        try {
          return new URL(tab.url).origin;
        } catch {
          return null;
        }
      })();
      if (!urlOrigin) return;
      const whitelist = data.whitelist || [];
      if (whitelist.includes(urlOrigin)) {
        chrome.tabs.setZoomSettings(zoomChangeInfo.tabId, { scope: "per-tab" });
      }
    });
  });
});
