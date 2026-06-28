// Capture selection when contextmenu is opened
document.addEventListener('contextmenu', () => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    // Save to storage (only the word, no context sentence or timestamp)
    chrome.storage.local.set({
      activeSelection: {
        word: selectedText
      }
    }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error setting active selection:", chrome.runtime.lastError);
      }
    });
  }
});
