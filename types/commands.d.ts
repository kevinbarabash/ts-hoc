declare global {
  namespace Cypress {
    interface Chainable {
      addBoard(input: string): void;
    }
  }
}

export {}; // This is necessary for the .d.ts file to work correctly
