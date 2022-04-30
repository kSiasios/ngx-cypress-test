export class FormLayoutsPage {
  submitInlineForm(
    name = "John Doe",
    email = "john@doe.com",
    rememberMe = true
  ) {
    // Select Inline Form container
    cy.contains("nb-card", "Inline form")
      .find("form")
      .then((form) => {
        cy.wrap(form)
          .find("input")
          .then((inputs) => {
            // find first name input and fill it
            cy.wrap(inputs).first().type(name);
            cy.wrap(inputs).first().should("have.value", name);
            // find last name input and fill it
            cy.wrap(inputs).eq(1).type(email);
            cy.wrap(inputs).eq(1).should("have.value", email);
            // check remember me input if rememberMe is true
            if (rememberMe) {
              cy.wrap(inputs).last().check({ force: true });
              cy.wrap(inputs).last().should("be.checked");
            } else {
              cy.wrap(inputs).last().should("not.be.checked");
            }
          });
        cy.wrap(form).submit();
      });
  }

  submitBasicForm(
    email = "john@doe.com",
    password = "123456789",
    rememberMe = true
  ) {
    cy.contains("nb-card", "Basic form")
      .find("nb-card-body form")
      .then((form) => {
        // find and fill email
        cy.wrap(form).find("[type='email']").type(email);
        cy.wrap(form).find("[type='email']").should("have.value", email);
        // find and fill password
        cy.wrap(form).find("[type='password']").type(password);
        cy.wrap(form).find("[type='password']").should("have.value", password);
        // find and check remember me
        if (rememberMe) {
          cy.wrap(form).find("[type='checkbox']").check({ force: true });
          cy.wrap(form).find("[type='checkbox']").should("be.checked");
        } else {
          cy.wrap(form).find("[type='checkbox']").should("not.be.checked");
        }
        // submit the form
        cy.wrap(form).submit();
      });
  }
}

export const onFormLayoutsPage = new FormLayoutsPage();
