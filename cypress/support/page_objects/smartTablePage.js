function clickSaveButton() {
  cy.get(".nb-checkmark").click();
}

export class SmartTablePage {
  insertObjectToSmartTable(
    id = 0,
    firstName = "John",
    lastName = "Doe",
    username = "jDoe",
    email = "john@doe.com",
    age = 35
  ) {
    const values = [id, firstName, lastName, username, email, age];
    cy.get("a i.nb-plus").click();

    // get row that contains the inputs of our new object
    cy.get("thead tr")
      .last()
      .then((row) => {
        // get input fields and fill them
        // cy.wrap(row).find("input[placeholder='ID']").type(id);
        // cy.wrap(row).find("input[placeholder='First Name']").type(firstName);
        // cy.wrap(row).find("input[placeholder='Last Name']").type(lastName);
        // cy.wrap(row).find("input[placeholder='Username']").type(username);
        // cy.wrap(row).find("input[placeholder='E-mail']").type(email);
        // cy.wrap(row).find("input[placeholder='Age']").type(age);
        cy.wrap(row)
          .find("input")
          .each((input, index) => {
            cy.wrap(input).type(values[index]);
          });

        // click confirm button
        clickSaveButton();
      });

    // verify inputs
    cy.get("tbody tr")
      .first()
      .then((row) => {
        cy.wrap(row)
          .find("td.ng-star-inserted")
          .not(".ng2-smart-actions")
          .each((td, index) => {
            cy.wrap(td).should("contain", values[index]);
          });
      });
  }

  modifyObjectByValue(
    valueToSearch,
    newValues = {
      id: null,
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      age: null,
    }
  ) {
    // Object that will have null values for unchanged fields and the input values for the fields that shall change
    let values = {
      id: null,
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      age: null,
    };

    // loop that copies the values that shall change, to the values object
    for (let i = 0; i < Object.keys(values).length; i++) {
      for (let j = 0; j < Object.keys(newValues).length; j++) {
        if (Object.keys(values)[i] === Object.keys(newValues)[j]) {
          values[Object.keys(values)[i]] = newValues[Object.keys(newValues)[j]];
        }
      }
    }

    cy.contains(".ng-star-inserted", valueToSearch)
      .parents("tr")
      .then((tableRow) => {
        // Find "Edit" button and click it
        cy.wrap(tableRow)
          .find("ng2-st-tbody-edit-delete .ng2-smart-action-edit-edit")
          .click({ force: true });

        // Find the input that corresponds to the age
        // and replace its value with th enew value (25)
        cy.wrap(tableRow)
          .find("input")
          .each((input, index) => {
            // console.log();
            if (
              values[Object.keys(values)[index]] != null &&
              values[Object.keys(values)[index]] != ""
            ) {
              cy.wrap(input).clear().type(values[Object.keys(values)[index]]);
            }
          });

        // Find the "Save changes" button and click it
        clickSaveButton();

        // Verify that the value changed
        cy.wrap(tableRow)
          .find("td.ng-star-inserted")
          .not(".ng2-smart-actions")
          .each((value, index) => {
            if (
              values[Object.keys(values)[index]] != null &&
              values[Object.keys(values)[index]] != ""
            ) {
              cy.wrap(value).should(
                "have.text",
                values[Object.keys(values)[index]]
              );
            }
            // }
          });
      });
  }

  //   deleteObjectOfValue(
  //     valueToSearch = {
  //       id: null,
  //       firstName: "",
  //       lastName: "",
  //       username: "",
  //       email: "",
  //       age: null,
  //     }
  //   )
  deleteObjectOfValue(valueToSearch) {
    cy.contains(".ng-star-inserted", valueToSearch)
      .parents("tr")
      .then((tableRow) => {
        // find delete button
        cy.wrap(tableRow)
          .find(
            "td.ng2-smart-actions ng2-st-tbody-edit-delete a.ng2-smart-action-delete-delete"
          )
          .click({ force: true });
      });
  }
  deleteObjectByIndex(index) {
    cy.get("tbody tr")
      .eq(index)
      .then((tableRow) => {
        // find delete button
        cy.wrap(tableRow)
          .find(
            "td.ng2-smart-actions ng2-st-tbody-edit-delete a.ng2-smart-action-delete-delete"
          )
          .click({ force: true });
      });
  }
}

export const onSmartTablePage = new SmartTablePage();
