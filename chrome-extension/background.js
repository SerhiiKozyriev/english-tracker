chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'add-to-tracker',
    title: "Add '%s' to Vocabulary",
    contexts: ['selection'],
  });

  chrome.storage.local.get(['targetLang'], (result) => {
    if (!result.targetLang) {
      chrome.storage.local.set({ targetLang: 'ru' });
    }
  });
});

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
