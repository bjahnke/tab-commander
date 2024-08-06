import { Command } from '../model/command-data.js';
import { handleResponse } from '../util.js';

/**
 * Handles the 'list' command. Sends a message to the background script to list all bookmarks.
 */
export function handleListCommand() {
    chrome.runtime.sendMessage({ action: 'list' }, handleResponse);
    }

// Function to handle listing bookmarks
function listBookmarks(_, sendResponse) {
    chrome.storage.local.get("bookmarks", (data) => {
        sendResponse({ status: "success", bookmarks: JSON.stringify(data.bookmarks, null, 2) });
    });
}

export const listCommand = new Command(
    'list', 
    'List all bookmarks', 
    handleListCommand, 
    listBookmarks,
    'list'
);