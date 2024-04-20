// jest.setup.js
import "@testing-library/jest-dom";
import "jest-axe/extend-expect"; // for testing accessibility

window.HTMLElement.prototype.scrollIntoView = jest.fn(); // mock scrollIntoView

// mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// for testing accessibility
jest.setTimeout(200 * 1000);
