# Zoom Per Tab

Zoom Per Tab is a Chrome extension that allows you to set a different zoom level for each tab, without affecting other tabs of the same domain.

---

## Original Project Features

- Set zoom level per tab, not per domain.
- Simple background script to enforce per-tab zoom using Chrome's API.

---

## Changes in This Fork

- **Whitelist UI**: Added a popup UI to manage a whitelist of domains. Only whitelisted domains will have per-tab zoom applied.
- **Enable/Disable Toggle**: Added a global toggle to enable or disable the extension's functionality without uninstalling.
- **Domain Management**: You can add or remove the current page's domain to/from the whitelist directly from the popup.
- **Persistent Settings**: Whitelist and enable/disable state are saved using Chrome's storage and persist across browser restarts.
- **English UI**: All UI and messages are in English.

---

## How to Use

1. **Install the extension** (load as unpacked in Chrome).
2. Click the extension icon to open the popup.
3. Use the toggle to enable/disable the extension globally.
4. Use the button to add or remove the current domain from the whitelist.
5. Only whitelisted domains will have per-tab zoom enforced.

---

## File Overview

- `service_worker.js`: Handles zoom logic based on whitelist and enable/disable state.
- `popup.html` / `popup.js`: Popup UI for managing whitelist and global toggle.
- `manifest.json`: Chrome extension manifest with required permissions and popup registration.

---

## Credits

This repository is a fork of the original [Zoom Per Tab](https://github.com/xinan/zoom-per-tab) project.

---

## License

See `LICENSE` file.
