describe("Visual Test", () => {
  it("should test snapshot", () => {
    cy.visit("/");

    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid").then(form => {
      // snap an element, in this case the form under the Using grid card
      cy.wrap(form).toMatchImageSnapshot();

      // snap the whole page
      cy.document().toMatchImageSnapshot();
    });
  });
});
