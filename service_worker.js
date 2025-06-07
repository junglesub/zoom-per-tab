// 화이트리스트 도메인 배열
const whitelist = ["https://github.com"];

chrome.tabs.onZoomChange.addListener((zoomChangeInfo) => {
  chrome.tabs.get(zoomChangeInfo.tabId, (tab) => {
    if (!tab || !tab.url) return;
    // whitelist에 포함된 도메인으로 시작하는지 확인
    if (whitelist.some((domain) => tab.url.startsWith(domain))) {
      chrome.tabs.setZoomSettings(zoomChangeInfo.tabId, { scope: "per-tab" });
    }
  });
});
