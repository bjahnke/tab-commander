/*
 * countains the logic for popup.js, code is contained separately from the popup.js file
 * to give more control to test setup. IE no need to deel with code execution upon import 
*/
function handleCommandInput(_) {
    const commandInput = document.getElementById('commandInput').value;
    const [command, ...args] = commandInput.split(' ');
  
    switch (command) {
      case 'open':
        handleOpenCommand(args);
        break;
      case 'add':
        handleAddCommand(args);
        break;
      case 'list':
        handleListCommand();
        break;
      case 'remove':
        handleRemoveCommand(args);
        break;
      case 'help':
        handleHelpCommand();
        break;
      default:
        displayOutput(`Unknown command: ${command}`);
    }
    
    // Clear the input field after processing the command
    document.getElementById('commandInput').value = '';
  }
  
  
  function handleOpenCommand(args) {
    const alias = args[0];
    const replace = args.includes('-r');
    chrome.runtime.sendMessage({ action: 'openBookmark', alias: alias, replace: replace }, null, handleResponse);
  }
  
  function handleAddCommand(args) {
    const alias = args[0];
    chrome.runtime.sendMessage({ action: 'addBookmark', alias: alias }, null, handleResponse);
  }
  
  function handleListCommand() {
    chrome.runtime.sendMessage({ action: 'listBookmarks' }, null, handleResponse);
  }
  
  function handleRemoveCommand(args) {
    const alias = args[0];
    chrome.runtime.sendMessage({ action: 'removeBookmark', alias: alias }, null, handleResponse);
  }
  
  function handleHelpCommand() {
    const helpMessage = `
      Available commands:
      - open [bookmark-alias] [-r]: Opens the bookmark in a new tab. Use -r to open in the current tab.
      - add [bookmark-alias]: Adds a new bookmark for the current active tab.
      - list: Lists all bookmarks.
      - remove [bookmark-alias]: Removes the specified bookmark.
      - help: Displays this help message.
    `;
    displayOutput(helpMessage);
  }
  
  function handleResponse(response) {
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
  
  function displayOutput(message) {
    const outputDiv = document.getElementById('output');
    outputDiv.textContent = message;
  }
  
  export function main() {
    document.getElementById('executeBtn').addEventListener('click', handleCommandInput);
  }
  
  export { handleCommandInput, handleOpenCommand, handleAddCommand, handleListCommand, handleRemoveCommand, handleHelpCommand, handleResponse, displayOutput };
  