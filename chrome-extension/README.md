# English Tracker Word Collector 🇬🇧

A premium, modern Google Chrome extension that lets you select any word or phrase on a web page, auto-translate it, and add it directly to your English Tracker vocabulary database.

## 🛠 Installation Instructions

To install the extension locally in Google Chrome:

1. Open **Google Chrome**.
2. Navigate to `chrome://extensions/` by typing it in the address bar.
3. Enable **Developer mode** using the toggle switch in the top-right corner.
4. Click the **Load unpacked** button in the top-left corner.
5. Select the `chrome-extension` folder inside this project directory (`english-tracker/chrome-extension`).
6. The extension is now active! You will see the **English Tracker** icon in your extension toolbar.

---

## 🚀 How to Use

### Add Words from Webpages
- Highlight any English word or phrase on a website.
- Right-click and choose **Add '[Selected Word]' to Vocabulary** from the context menu.
- The side panel will open on the right side of your browser:
  - The highlighted **Word** will be pre-filled.
  - The word will be **automatically translated** in the background into your target language.
- Review the translation and click **Add to Vocabulary**.
- The word is now synced with your English Tracker database!



---

## 📂 File Structure

- [manifest.json](file:///C:/Users/Medvigr/Desktop/english-tracker/chrome-extension/manifest.json) — Extension configuration (Manifest V3)
- [background.js](file:///C:/Users/Medvigr/Desktop/english-tracker/chrome-extension/background.js) — Background script for managing context menus and opening the sidepanel
- [content.js](file:///C:/Users/Medvigr/Desktop/english-tracker/chrome-extension/content.js) — Content script for capturing text selections and context sentences on right-click
- [sidepanel.html](file:///C:/Users/Medvigr/Desktop/english-tracker/chrome-extension/sidepanel.html) — Sidepanel user interface structure
- [sidepanel.css](file:///C:/Users/Medvigr/Desktop/english-tracker/chrome-extension/sidepanel.css) — Premium dark-themed stylesheet with custom animations
- [sidepanel.js](file:///C:/Users/Medvigr/Desktop/english-tracker/chrome-extension/sidepanel.js) — Main sidepanel functionality, Google Translate integration, API requests
- [icons/](file:///C:/Users/Medvigr/Desktop/english-tracker/chrome-extension/icons/) — Auto-generated extension logo assets (16x16, 48x48, 128x128)
