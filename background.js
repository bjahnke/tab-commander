chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ bookmarks: {}, consoleOpen: false });
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "addBookmark") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const url = tabs[0].url;
        chrome.storage.local.get("bookmarks", (data) => {
          let bookmarks = data.bookmarks || {};
          bookmarks[message.alias] = url;
          chrome.storage.local.set({ bookmarks: bookmarks });
          sendResponse({ status: "success", alias: message.alias, url: url });
        });
      });
    } else if (message.action === "openBookmark") {
      chrome.storage.local.get("bookmarks", (data) => {
        const url = data.bookmarks[message.alias];
        if (url) {
          if (message.replace) {
            chrome.tabs.update({ url: url });
          } else {
            chrome.tabs.create({ url: url });
          }
          sendResponse({ status: "success", alias: message.alias, url: url });
        } else {
          sendResponse({ status: "error", message: "Bookmark not found" });
        }
      });
    } else if (message.action === "listBookmarks") {
      chrome.storage.local.get("bookmarks", (data) => {
        sendResponse({ status: "success", bookmarks: data.bookmarks });
      });
    } else if (message.action === "toggleConsole") {
      chrome.storage.local.get("consoleOpen", (data) => {
        const consoleOpen = !data.consoleOpen;
        chrome.storage.local.set({ consoleOpen: consoleOpen });
        sendResponse({ status: "success", consoleOpen: consoleOpen });
      });
    }
    return true;
  });
  