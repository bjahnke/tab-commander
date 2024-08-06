import { Command } from '../model/command-data.js';
import { handleResponse } from '../util.js';

export function handleOpenCommand(args) {
    const alias = args[0];
    const replace = args.includes('-r');
    chrome.runtime.sendMessage({ action: 'open', alias: alias, replace: replace }, handleResponse);
}

// Function to handle opening a bookmark
function openBookmark(message, sendResponse) {
    chrome.storage.local.get("bookmarks", (data) => {
        const alias = message.alias;
        const replace = message.replace;
        const url = data.bookmarks[alias];
        if (url) {
        if (replace) {
            chrome.tabs.update({ url: url });
        } else {
            chrome.tabs.create({ url: url });
        }
        sendResponse({ status: "success", alias: alias, url: url });
        } else {
        sendResponse({ status: "error", message: "Bookmark not found" });
        }
    });
}

export const openCommand = new Command(
    'open', 
    'Open a bookmark. Use -r to open in current tab.', 
    handleOpenCommand, 
    openBookmark,
    'open <alias> [-r]'
);