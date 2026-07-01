document.addEventListener('contextmenu', () => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
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
