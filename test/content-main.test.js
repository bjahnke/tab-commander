import { displayOutput } from '../src/content-main.js';

describe('Content Script Tests', () => {
  beforeAll(() => {
    // Setup any required global variables or mocks
    document.body.innerHTML = `
      <div id="tab-commander-console"></div>
      <textarea id="tab-commander-input"></textarea>
      <div id="tab-commander-output"></div>
    `;
  });

  test('Should display output message', () => {
    const message = 'Test message';
    displayOutput(message);
    const outputDiv = document.getElementById('tab-commander-output');
    expect(outputDiv.textContent).toBe(message);
  });

  // Add more tests for other functionalities
});
