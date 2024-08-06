import { commandCollection, displayOutput } from "./commands";

/**
 * Creates the Tab Commander console and appends it to the document body.
 * Sets up event listeners for the close button and command input.
 */
export function createConsole() {
  let consoleDiv = document.createElement('div');
  consoleDiv.id = 'tab-commander-console';
  consoleDiv.innerHTML = `
    <div id="tab-commander-header">
      <span>Tab Commander</span>
      <button id="tab-commander-close">X</button>
    </div>
    <textarea id="tab-commander-input" placeholder="Enter command..."></textarea>
    <div id="tab-commander-output"></div>
  `;
  document.body.appendChild(consoleDiv);

  document.getElementById('tab-commander-close').addEventListener('click', closeConsole);
  document.getElementById('tab-commander-input').addEventListener('keydown', handleCommandInput);
}

/**
 * Closes the Tab Commander console and sends a message to the background script to update the console state.
 */
export function closeConsole() {
  document.getElementById('tab-commander-console').style.display = 'none';
  chrome.runtime.sendMessage({ action: 'toggleConsole' });
}

/**
 * Handles the command input. Parses the command and calls the appropriate handler function.
 * Clears the input field after processing the command.
 * @param {KeyboardEvent} event - The keyboard event triggered by the Enter key.
 */
export function handleCommandInput(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const commandInput = document.getElementById('tab-commander-input');
    const command = commandInput.value.trim();
    const [action, ...args] = command.split(' ');

    const commandObj = commandCollection[action];
    if (commandObj) {
      commandObj.handle(args);
    } else {
      displayOutput(`Unknown command: ${action}`);
    }
    // Clear the input field after processing the command
    commandInput.value = '';
  }
}


/**
 * Toggles the visibility of the Tab Commander console based on messages from the background script.
 * @param {Object} request - The request message from the background script.
 */
export function toggleConsoleVisibility(request) {
  if (request.action === "toggleConsole") {
    const consoleDiv = document.getElementById('tab-commander-console');
    if (request.consoleOpen) {
      consoleDiv.style.display = 'block';
    } else {
      consoleDiv.style.display = 'none';
    }
  }
}

/**
 * Initializes the visibility of the Tab Commander console based on the saved state in local storage.
 */
export function initializeConsoleVisibility() {
  chrome.storage.local.get("consoleOpen", (data) => {
    if (data.consoleOpen) {
      document.getElementById('tab-commander-console').style.display = 'block';
    }
  });
}

/**
 * Main function to initialize the Tab Commander console.
 * Sets up event listeners and initializes the console visibility.
 */
export function main() {
  // Initialize the console
  createConsole();

  // Listen for messages to toggle console visibility
  chrome.runtime.onMessage.addListener(toggleConsoleVisibility);

  // Set initial console visibility based on saved state
  initializeConsoleVisibility();
}
