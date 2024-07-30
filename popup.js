document.getElementById('executeBtn').addEventListener('click', () => {
    const commandInput = document.getElementById('commandInput').value;
    const [command, ...args] = commandInput.split(' ');
  
    if (command === 'open') {
      const alias = args[0];
      const replace = args.includes('-r');
      chrome.runtime.sendMessage({ action: 'openBookmark', alias: alias, replace: replace }, handleResponse);
    } else if (command === 'add') {
      const alias = args[0];
      chrome.runtime.sendMessage({ action: 'addBookmark', alias: alias }, handleResponse);
    } else if (command === 'list') {
      chrome.runtime.sendMessage({ action: 'listBookmarks' }, handleResponse);
    } else {
      displayOutput(`Unknown command: ${command}`);
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
  
  function displayOutput(message) {
    const outputDiv = document.getElementById('output');
    outputDiv.textContent = message;
  }
  