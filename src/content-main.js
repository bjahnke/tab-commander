export function displayOutput(message) {
    let outputDiv = document.getElementById('tab-commander-output');
    outputDiv.textContent = message;
  }
  
export function main() {
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
    
      document.getElementById('tab-commander-close').addEventListener('click', () => {
        document.getElementById('tab-commander-console').style.display = 'none';
        chrome.runtime.sendMessage({ action: 'toggleConsole' });
      });
    
      document.getElementById('tab-commander-input').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          let commandInput = document.getElementById('tab-commander-input').value;
          let [command, ...args] = commandInput.split(' ');
    
          if (command === 'open') {
            let alias = args[0];
            let replace = args.includes('-r');
            chrome.runtime.sendMessage({ action: 'openBookmark', alias: alias, replace: replace }, handleResponse);
          } else if (command === 'add') {
            let alias = args[0];
            chrome.runtime.sendMessage({ action: 'addBookmark', alias: alias }, handleResponse);
          } else if (command === 'list') {
            chrome.runtime.sendMessage({ action: 'listBookmarks' }, handleResponse);
          } else {
            displayOutput(`Unknown command: ${command}`);
          }
        }
      });
    
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
    
  
    
      // Listen for messages to toggle console visibility
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "toggleConsole") {
          if (request.consoleOpen) {
            document.getElementById('tab-commander-console').style.display = 'block';
          } else {
            document.getElementById('tab-commander-console').style.display = 'none';
          }
        }
      });
    
      // Toggle console visibility based on saved state
      chrome.storage.local.get("consoleOpen", (data) => {
        if (data.consoleOpen) {
          document.getElementById('tab-commander-console').style.display = 'block';
        }
      });
  }