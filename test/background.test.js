import { handleMessages } from '../src/background.js';
import { jest } from '@jest/globals';

describe('handleMessages', () => {
    it('should respond with bookmarks when action is listBookmarks', () => {
      const message = { action: 'listBookmarks' };
      const sendResponse = jest.fn();
  
      handleMessages(message, null, sendResponse);
  
      expect(chrome.storage.local.get).toHaveBeenCalledWith('bookmarks', expect.any(Function));
      expect(sendResponse).toHaveBeenCalledWith({ status: 'success', bookmarks: [] });
    });
  });

describe('Background Script Tests', () => {
  beforeAll(() => {
    // Setup any required global variables or mocks
  });

  test('Should add a bookmark', () => {
    // Mock data and functions
    const message = { action: 'addBookmark', alias: 'testAlias' };
    const sender = {};
    const sendResponse = jest.fn();

    // Mock chrome API
    global.chrome = {
      tabs: {
        query: (queryInfo, callback) => {
          callback([{ url: 'http://example.com' }]);
        },
      },
      storage: {
        local: {
          get: (key, callback) => {
            callback({ bookmarks: {} });
          },
          set: jest.fn(),
        },
      },
    };

    // Call the function
    handleMessages(message, sender, sendResponse);

    // Assertions
    expect(sendResponse).toHaveBeenCalledWith({
      status: 'success',
      alias: 'testAlias',
      url: 'http://example.com',
    });
  });

  // Add more tests for other functionalities
});
