import { Command } from '../model/command-data.js';
import { handleResponse } from '../util.js';

/**
 * Handles the 'remove' command. Sends a message to the background script to remove the specified bookmark.
 * @param {*} args 
 */
export function handleRemoveCommand(args) {
    const alias = args[0];
    chrome.runtime.sendMessage({ action: 'remove', alias: alias }, handleResponse);
    }

// Function to handle removing a bookmark
function removeBookmark(message, sendResponse) {
    chrome.storage.local.get("bookmarks", (data) => {
        const alias = message.alias;
        let bookmarks = data.bookmarks || {};
        if (bookmarks[alias]) {
        delete bookmarks[alias];
        chrome.storage.local.set({ bookmarks: bookmarks });
        sendResponse({ status: "success", alias: alias });
        } else {
        sendResponse({ status: "error", message: "Bookmark not found" });
        }
    });
}

export const removeCommand = new Command(
    'remove', 
    'Remove a bookmark', 
    handleRemoveCommand, 
    removeBookmark,
    'remove <alias>'
);