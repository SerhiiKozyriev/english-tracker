chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'add-to-tracker',
    title: "Add '%s' to Vocabulary",
    contexts: ['selection'],
  });

  // Set default values if not already present
  chrome.storage.local.get(['targetLang'], (result) => {
    if (!result.targetLang) {
      chrome.storage.local.set({ targetLang: 'ru' });
    }
  });
});

// Configure side panel to open when extension icon is clicked
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error('Error setting panel behavior:', error));

// Handle context menu selection
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "add-to-tracker" && tab) {
    chrome.sidePanel.open({ tabId: tab.id }).catch((error) => {
      console.error("Failed to open side panel:", error);
    });
  }
});
