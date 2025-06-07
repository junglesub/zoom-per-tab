// popup.js
function getDomain(url) {
  try {
    const u = new URL(url);
    return u.origin;
  } catch {
    return null;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const domain = tab && tab.url ? getDomain(tab.url) : null;
  const domainSpan = document.getElementById("currentDomain");
  const toggleBtn = document.getElementById("toggleDomainBtn");
  const globalToggle = document.getElementById("globalToggle");

  // Read state from storage
  chrome.storage.sync.get(["whitelist", "enabled"], (data) => {
    const whitelist = data.whitelist || [];
    const enabled = data.enabled !== false; // Default: true
    globalToggle.checked = enabled;

    if (domain) {
      domainSpan.textContent = domain;
      toggleBtn.textContent = whitelist.includes(domain)
        ? "Remove from whitelist"
        : "Add to whitelist";
      toggleBtn.disabled = false;
    } else {
      domainSpan.textContent = "Invalid page";
      toggleBtn.disabled = true;
    }
  });

  // Add/remove domain
  toggleBtn.onclick = () => {
    chrome.storage.sync.get(["whitelist"], (data) => {
      let whitelist = data.whitelist || [];
      if (!domain) return;
      if (whitelist.includes(domain)) {
        whitelist = whitelist.filter((d) => d !== domain);
      } else {
        whitelist.push(domain);
      }
      chrome.storage.sync.set({ whitelist }, () => {
        window.location.reload();
      });
    });
  };

  // Enable/disable extension
  globalToggle.onchange = () => {
    chrome.storage.sync.set({ enabled: globalToggle.checked });
  };
});
