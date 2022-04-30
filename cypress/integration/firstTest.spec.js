/// <reference types="cypress"/>

describe("Our first suite", () => {
  it("first test", () => {
    // console.log("Hey Jude");
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
    // By tag name
    cy.get("input");

    // By ID
    cy.get("#inputEmail1");

    // By class name
    cy.get(".input-full-width");

    // By attribute name
    cy.get("[placeholder]");

    // By attribute name and value
    cy.get("[placeholder='Email']");

    // By class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    // By tag name and attribute with value
    cy.get('input[placeholder="Email"]');

    // by two different attributes
    cy.get('[placeholder="Email"][fullwidth][type="email"]');

    // by tag name, attribute with value, ID and classname
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

    // The most recommended way by Cypress / Best practice => with custom attributes
    cy.get('[data-cy="imputEmail1"]');
  });

  it("Second test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.get('[data-cy="signInButton"]');

    cy.contains("Sign in");

    cy.contains('[status="warning"]', "Sign in");

    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();
  });

  it("Then and Wrap methods", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // cy.contains("nb-card", "Using the Grid")
    //   .find("[for='inputEmail1']")
    //   .should("contain", "Email");

    // cy.contains("nb-card", "Using the Grid")
    //   .find("[for='inputPassword2']")
    //   .should("contain", "Password");

    // cy.contains("nb-card", "Basic form")
    //   .find("[for='exampleInputEmail1']")
    //   .should("contain", "Email");

    // cy.contains("nb-card", "Basic form")
    //   .find("[for='exampleInputPassword1']")
    //   .should("contain", "Password");

    cy.contains("nb-card", "Using the Grid").then((firstForm) => {
      const emailLabel = firstForm.find("[for='inputEmail1']").text();
      const passwordLabel = firstForm.find("[for='inputPassword2']").text();

      expect(emailLabel).to.equal("Email");
      expect(passwordLabel).to.equal("Password");

      cy.contains("nb-card", "Basic form").then((secondForm) => {
        const secondPasswordLabel = secondForm
          .find("[for='exampleInputPassword1']")
          .text();
        expect(secondPasswordLabel).to.equal(passwordLabel);

        // .then() returns second form as jQuery object
        // .wrap() converts the object back to a Cypress Object
        cy.wrap(secondForm)
          .find("[for='exampleInputEmail1']")
          .should("contain", "Email");
      });
    });
  });

  it("Invoke Command", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // First example using .should
    cy.get("[for='exampleInputEmail1']").should("contain", "Email address");
    // Second example using .then()
    cy.get("[for='exampleInputEmail1']").then((label) => {
      expect(label.text()).to.equal("Email address");
    });

    // Third example using .invoke()
    cy.get("[for='exampleInputEmail1']")
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Email address");
      });

    // Example: try to find out
    // if the checkbox of basic form is checked
    // My try
    // cy.contains("Basic form")
    //   .parents("nb-card")
    //   .get("nb-checkbox")
    //   .get(".custom-checkbox")
    //   .invoke("class")
    //   .then((classlist) => {
    //     expect(classlist).to.contain("checked");
    //   });

    // Turorial try
    cy.contains("nb-card", "Basic form")
      .find("nb-checkbox")
      .click()
      .find(".custom-checkbox")
      .invoke("attr", "class")
      // .should("contain", "checked");
      .then((classlist) => {
        expect(classlist).to.contain("checked");
      });
  });

  // Datepicker test
  it("Invoke Command", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    // My try
    // cy.contains("nb-card", "Common Datepicker")
    //   .find("input")
    //   .click()
    //   .get(".cdk-overlay-container")
    //   .contains("nb-calendar", "Today")
    //   .get("nb-calendar-pageable-navigation")
    //   .get("nb-icon[ng-reflect-icon='chevron-right-outline']")
    //   .parents("button")
    //   .click()
    //   .parents("nb-calendar")
    //   .get("nb-calendar-day-picker")
    //   .get("nb-calendar-picker")
    //   .get("nb-calendar-picker-row")
    //   .get('[ng-reflect-row="Sun May 22 2022 00:00:00 GMT+0"]')
    //   .contains("nb-calendar-day-cell", "25")
    //   .click()
    //   .then(() => {
    //     cy.contains("nb-card", "Common Datepicker")
    //       .find("input")
    //       .invoke("prop", "value")
    //       .should("contain", "May 25, 2022");
    //     // .then((value) => {
    //     //   expect(value.text()).to.equal("May 25, 2022");
    //     // });
    //   });

    // Tutorial
    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        cy.get("nb-calendar-day-picker").contains("25").click();

        cy.wrap(input)
          .invoke("prop", "value")
          .should("contain", "Apr 25, 2022");
      });
  });

  it("Automate Checking Radio Buttons", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find("[type='radio']")
      .then((radioButtons) => {
        // check and assert first radio button
        cy.wrap(radioButtons)
          .first()
          .check({ force: true })
          .should("be.checked");
        // check and assert second radio button and check that the first one is unchecked
        cy.wrap(radioButtons)
          .eq(1)
          .check({ force: true })
          .should("be.checked")
          .then(() => {
            cy.wrap(radioButtons).first().should("not.be.checked");
          });

        cy.wrap(radioButtons).last().should("be.disabled");
      });
  });

  it("Automate Checking Checkboxes", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();

    // check method to check a checkbox
    cy.get("[type='checkbox']").check({ force: true });
    // click method to uncheck a checkbox
    cy.get("[type='checkbox']").click({ multiple: true, force: true });
  });

  it("Dropdown", () => {
    cy.visit("/");

    // For one value
    // cy.get("nav nb-select").then((themeChanger) => {
    //   cy.wrap(themeChanger)
    //     .click()
    //     .get(".options-list")
    //     .find("nb-option[ng-reflect-value='dark']")
    //     .click();

    //   cy.wrap(themeChanger)
    //     .invoke("attr", "ng-reflect-selected")
    //     .should("contain", "dark");

    //   cy.get("nav ngx-header")
    //     .parents("nav")
    //     .should("have.css", "background-color", "rgb(34, 43, 69)");
    // });

    // For multiple values
    cy.get("nav nb-select").then((themeChanger) => {
      cy.wrap(themeChanger).click();
      cy.get(".options-list nb-option").each((listItem, index) => {
        const itemText = listItem.text().trim();

        const colors = {
          Light: "rgb(255, 255, 255)",
          Dark: "rgb(34, 43, 69)",
          Cosmic: "rgb(50, 50, 89)",
          Corporate: "rgb(255, 255, 255)",
        };

        cy.wrap(listItem).click({ force: true });
        if (index < Object.keys(colors).length - 1) {
          cy.wrap(themeChanger).should("contain", itemText).click();
        } else {
          cy.wrap(themeChanger).should("contain", itemText);
        }
        cy.get("nav ngx-header")
          .parents("nav")
          .should("have.css", "background-color", colors[itemText]);
      });
    });

    // If the the tag name is select and not a custom name
    // We can use .select function to select the options
    // Not only by text, but by the value too
  });

  it("Smart Table", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    // // My Try

    // // Find Larry and update their age to 25
    // cy.contains(".ng-star-inserted", "Larry")
    //   .parents("tr")
    //   .then((tableRow) => {
    //     const newValue = "25";

    //     // Find "Edit" button and click it
    //     cy.wrap(tableRow)
    //       .find("ng2-st-tbody-edit-delete .ng2-smart-action-edit-edit")
    //       .click({ force: true });

    //     // Find the input that corresponds to the age
    //     // and replace its value with th enew value (25)
    //     cy.wrap(tableRow)
    //       .find("input[placeholder='Age']")
    //       .clear()
    //       .type(newValue);

    //     // Find the "Save changes" button and click it
    //     cy.wrap(tableRow)
    //       .find("ng2-st-tbody-create-cancel .ng2-smart-action-edit-save")
    //       .click({ force: true });

    //     // Verify that the value changed
    //     cy.wrap(tableRow)
    //       .find(".ng-star-inserted")
    //       .last()
    //       .should("contain", newValue);
    //   });

    // // Tutorial

    // cy
    //   // .get("tbody")
    //   .contains("tr", "Larry")
    //   .then((tableRow) => {
    //     cy.wrap(tableRow).find(".nb-edit").click();
    //     cy.wrap(tableRow).find("[placeholder='Age']").clear().type("25");
    //     cy.wrap(tableRow).find(".nb-checkmark").click();
    //     cy.wrap(tableRow).find("td").eq(6).should("contain", "25");
    //   });

    // Add new item

    // // My Try

    // cy.get(".nb-plus").click();
    // cy.get("i.nb-checkmark").then((checkmark) => {
    //   cy.wrap(checkmark)
    //     .parents("tr")
    //     .then((newRow) => {
    //       const firstName = "Konstantinos";
    //       const lastName = "Siasios";
    //       cy.wrap(newRow).find("[placeholder='First Name']").type(firstName);
    //       cy.wrap(newRow).find("[placeholder='Last Name']").type(lastName);
    //       cy.wrap(checkmark).click();
    //       cy.get("tr")
    //         .eq(2)
    //         .should("contain", firstName)
    //         .should("contain", lastName);
    //     });
    // });

    // // Tutorial
    // const firstName = "Konstantinos";
    // const lastName = "Siasios";
    // cy.get("thead").find(".nb-plus").click();
    // cy.get("thead")
    //   .find("tr")
    //   .eq(2)
    //   .then((tableRow) => {
    //     cy.wrap(tableRow).find("[placeholder='First Name']").type(firstName);
    //     cy.wrap(tableRow).find("[placeholder='Last Name']").type(lastName);
    //     cy.wrap(tableRow).find(".nb-checkmark").click();
    //   });
    // cy.get("tbody tr")
    //   .first()
    //   .find("td")
    //   .then((tableColumns) => {
    //     cy.wrap(tableColumns).eq(2).should("contain", firstName);
    //     cy.wrap(tableColumns).eq(3).should("contain", lastName);
    //   });

    // Test Searching
    // Search for ages 20, 30, 40 and verify the results

    // // My try
    // cy
    //   // .get("thead")
    //   .get("[placeholder='Age']")
    //   .then((ageField) => {
    //     const agesArray = [20, 30, 40];
    //     // const agesEntries = [5, 1, 2];
    //     agesArray.forEach((age) => {
    //       cy.wrap(ageField).clear().type(age, { delay: 250 });

    //       cy.get("tbody")
    //         .find("tr")
    //         .each((row) => {
    //           cy.wrap(row).find("td").last().should("contain", age);
    //         });
    //     });
    //   });

    // Tutorial
    const age = [20, 30, 40, 200];
    cy.wrap(age).each((age) => {
      cy.get("thead [placeholder='Age']").clear().type(age);
      cy.wait(500);
      cy.get("tbody tr").each((tableRow) => {
        if (age == 200) {
          cy.wrap(tableRow).should("contain", "No data found");
        } else {
          cy.wrap(tableRow).find("td").eq(6).should("contain", age);
        }
      });
    });
  });

  it("DatePicker", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    function selectDateInDays(days) {
      let date = new Date();
      date.setDate(date.getDate() + days);
      let futureDay = date.getDate();
      let futureDate = date.toLocaleString("default", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      let futureYear = date.getFullYear();
      let futureMonth = date.toLocaleString("default", { month: "short" });

      cy.get("nb-calendar-navigation")
        .invoke("attr", "ng-reflect-date")
        .then((currentMonthDate) => {
          if (
            !currentMonthDate.includes(futureMonth) ||
            !currentMonthDate.includes(futureYear)
          ) {
            cy.get("nb-icon[ng-reflect-icon='chevron-right-outline']")
              .parents("button")
              .click();
            selectDateInDays(days);
          }
          // .should("contain", futureMonth);
        });
      return { futureDay: futureDay, futureDate: futureDate };
    }

    const daysFromToday = 15;

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        let returnValue = selectDateInDays(daysFromToday);
        cy.contains(
          "nb-calendar-day-cell[class='day-cell ng-star-inserted']",
          returnValue.futureDay
        ).click();
        cy.wrap(input)
          .invoke("prop", "value")
          .should("contain", returnValue.futureDate);
      });
  });

  it("Tooltips", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Tooltip").click();

    cy.contains("nb-card", "Colored Tooltips")
      .contains("button", "Default")
      .click();
    cy.get("nb-tooltip .content span").should("contain", "This is a tooltip");
  });

  it("Dialog Boxes", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    // cy.get(".nb-trash").first().click();

    // // Method 1
    // cy.get(".nb-trash").first().click();
    // cy.on("window:confirm", (confirm) => {
    //   expect(confirm).to.equal("Are you sure you want to delete?")
    // })

    // // Method 2
    // const stub = cy.stub();
    // cy.on("window:confirm", stub);
    // cy.get(".nb-trash")
    //   .first()
    //   .click()
    //   .then(() => {
    //     expect(stub.getCall(0)).to.be.calledWith(
    //       "Are you sure you want to delete?"
    //     );
    //   });

    // Method 3 (to cancel)
    cy.get(".nb-trash").first().click();
    cy.on("window:confirm", () => {
      return false;
    });
  });
});
