// DOM Elements
const wordInput = document.getElementById('word-input');
const clearWordBtn = document.getElementById('clear-word-btn');
const translationInput = document.getElementById('translation-input');
const autoTranslateBtn = document.getElementById('auto-translate-btn');
const translateBtnText = document.getElementById('translate-btn-text');
const translateSpinner = document.getElementById('translate-spinner');
const exampleInput = document.getElementById('example-input');
const addWordBtn = document.getElementById('add-word-btn');
const addBtnText = document.getElementById('add-btn-text');
const addSpinner = document.getElementById('add-spinner');
const messageContainer = document.getElementById('message-container');

// Hardcoded Config
const API_HOST = 'http://localhost:3000/api';
const TARGET_LANG = 'ru';

document.addEventListener('DOMContentLoaded', async () => {
  chrome.storage.local.get(['activeSelection'], (result) => {
    if (result.activeSelection) {
      handleNewSelection(result.activeSelection);
    }
  });

  setupListeners();
});

function setupListeners() {
  clearWordBtn.addEventListener('click', () => {
    wordInput.value = '';
    clearWordBtn.style.display = 'none';
  });

  wordInput.addEventListener('input', () => {
    clearWordBtn.style.display = wordInput.value ? 'flex' : 'none';
  });

  autoTranslateBtn.addEventListener('click', handleAutoTranslate);

  addWordBtn.addEventListener('click', handleAddWord);

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.activeSelection) {
      handleNewSelection(changes.activeSelection.newValue);
    }
  });
}

// Populate fields on new selection
async function handleNewSelection(selection) {
  if (!selection || !selection.word) return;

  wordInput.value = selection.word;
  exampleInput.value = selection.example || '';
  clearWordBtn.style.display = 'flex';

  translationInput.value = '';
  hideFeedback();

  if (selection.word) {
    try {
      autoTranslateBtn.disabled = true;
      translateBtnText.textContent = 'Translating...';
      translateSpinner.classList.remove('hide');

      const translation = await fetchTranslation(selection.word, TARGET_LANG);
      translationInput.value = translation;
    } catch (err) {
      console.error("Auto-translation error:", err);
    } finally {
      autoTranslateBtn.disabled = false;
      translateBtnText.textContent = 'Auto Translate';
      translateSpinner.classList.add('hide');
    }
  }
}

// Call Google Translate API
async function fetchTranslation(text, lang) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(text)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Translation request failed");
  const result = await response.json();
  if (result && result[0] && result[0][0] && result[0][0][0]) {
    return result[0][0][0];
  }
  throw new Error("Invalid response format");
}

// Handle Auto Translate Button Action
async function handleAutoTranslate() {
  const word = wordInput.value.trim();
  if (!word) {
    showFeedback("Please enter a word first", "error");
    return;
  }

  autoTranslateBtn.disabled = true;
  translateSpinner.classList.remove('hide');
  translateBtnText.textContent = 'Translating...';

  try {
    const translation = await fetchTranslation(word, TARGET_LANG);
    translationInput.value = translation;
    showFeedback("Translated successfully", "success");
  } catch (error) {
    console.error(error);
    showFeedback("Failed to translate. Try typing manually.", "error");
  } finally {
    autoTranslateBtn.disabled = false;
    translateSpinner.classList.add('hide');
    translateBtnText.textContent = 'Auto Translate';
  }
}

// Handle Adding a Word to the backend
async function handleAddWord() {
  const word = wordInput.value.trim();
  const translation = translationInput.value.trim();
  const example = exampleInput.value.trim();
  const status = 'learning';

  if (!word) {
    showFeedback("Word/Phrase is required", "error");
    wordInput.focus();
    return;
  }
  if (!translation) {
    showFeedback("Translation is required", "error");
    translationInput.focus();
    return;
  }

  addWordBtn.disabled = true;
  addSpinner.classList.remove('hide');
  addBtnText.textContent = 'Adding Word...';
  hideFeedback();

  try {
    const postUrl = `${API_HOST}/vocabulary/`;
    const body = { word, translation, example, status };

    const response = await fetch(postUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `HTTP ${response.status}`);
    }

    showFeedback(`"${word}" added successfully!`, "success");

    wordInput.value = '';
    translationInput.value = '';
    exampleInput.value = '';
    clearWordBtn.style.display = 'none';

    chrome.storage.local.remove('activeSelection');

  } catch (error) {
    console.error("Error adding word:", error);
    showFeedback(`Failed to add: ${error.message || 'Connection refused'}`, "error");
  } finally {
    addWordBtn.disabled = false;
    addSpinner.classList.add('hide');
    addBtnText.textContent = 'Add to Vocabulary';
  }
}

function showFeedback(text, type) {
  messageContainer.textContent = text;
  messageContainer.className = `message-container ${type}`;
  messageContainer.classList.remove('hide');

  if (type === 'success') {
    setTimeout(() => {
      if (messageContainer.textContent === text) {
        hideFeedback();
      }
    }, 3000);
  }
}

function hideFeedback() {
  messageContainer.classList.add('hide');
}
