/**
 * @fileoverview Command related utility functions
 */

/**
 * Displays a message in the Tab Commander console output.
 * @param {string} message - The message to display.
 */
export function displayOutput(message) {
    const outputDiv = document.getElementById('tab-commander-output');
    outputDiv.textContent = message;
}


/**
 * Handles the response from the background script. Displays the result in the console output.
 * @param {Object} response - The response from the background script.
 */
export function handleResponse(response) {
    if (response.status === 'success') {
        if (response.alias) {
        displayOutput(`Success: ${response.alias} -> ${response.url}`);
        } else {
        displayOutput('Bookmarks: ' + JSON.stringify(response.bookmarks, null, 2));
        }
    } else {
        displayOutput(`Error: ${response.message}`);
    }
}