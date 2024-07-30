
(async () => {
  const module = await import(chrome.runtime.getURL('src/content-main.js'))
  module.main();
})();
