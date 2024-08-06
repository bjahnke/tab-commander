import { Command } from '../model/command-data.js';
import { handleResponse } from '../util.js';

// Function to handle adding a bookmark
function addBookmark(message, sendResponse) {
    const alias = message.alias;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0].url;
      chrome.storage.local.get("bookmarks", (data) => {
        let bookmarks = data.bookmarks || {};
        bookmarks[alias] = url;
        chrome.storage.local.set({ bookmarks: bookmarks });
        sendResponse({ status: "success", alias: alias, url: url });
      });
    });
}

/**
 * Handles the 'add' command. Sends a message to the background script to add a new bookmark.
 * @param {Array<string>} args - The arguments for the 'add' command.
 */
export function handleAddCommand(args) {
    const alias = args[0];
    chrome.runtime.sendMessage({ action: 'add', alias: alias }, handleResponse);
}

export const add = new Command(
    'add', 
    'Add a new bookmark', 
    handleAddCommand, 
    addBookmark,
    'add <alias>'
);
