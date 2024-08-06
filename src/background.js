import commands from "./commands";
// background.js

// Function to handle when the extension is installed
function onInstalled() {
  chrome.storage.local.set({ bookmarks: {}, consoleOpen: false });
  chrome.action.onClicked.addListener(onActionClicked);
}

// Function to handle browser action button click
function onActionClicked(tab) {
  chrome.storage.local.get("consoleOpen", (data) => {
    const consoleOpen = !data.consoleOpen;
    chrome.storage.local.set({ consoleOpen: consoleOpen });
    chrome.tabs.sendMessage(tab.id, { action: "toggleConsole", consoleOpen: consoleOpen });
  });
}

// Function to handle incoming messages
function handleMessages(message, sender, sendResponse) {
  commands[message.action].execute(message, sendResponse);
  return true;
}

// Register the listeners
chrome.runtime.onInstalled.addListener(onInstalled);
chrome.runtime.onMessage.addListener(handleMessages);

export {
  handleMessages,
}; // Export for testing
