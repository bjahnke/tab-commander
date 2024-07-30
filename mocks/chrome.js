import { jest } from '@jest/globals';

// __mocks__/chrome.js
const chrome = {
    storage: {
      local: {
        get: jest.fn((key, callback) => {
          callback({ bookmarks: [] }); // Mock response
        }),
      },
    },
    runtime: {
      onMessage: {
        addListener: jest.fn(),
      },
    },
  };
  
  global.chrome = chrome;
  export { chrome };