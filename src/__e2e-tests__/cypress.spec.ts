describe("foo", () => {
  it("should pass", () => {
    cy.visit("http://localhost:3000");
    cy.get("h1").should("contain", "Hello World!");
    cy.addBoard("greeting"); // custom command
  });
});
