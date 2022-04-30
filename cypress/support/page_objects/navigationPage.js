function _clickMenu(menuName) {
  cy.contains("li", menuName).then((listItem) => {
    cy.wrap(listItem)
      .find("ul")
      .invoke("attr", "class")
      .then((listClass) => {
        if (listClass.includes("collapsed")) {
          cy.wrap(listItem).click();
        }
      });
  });
}

export class NavigationPage {
  formLayoutsPage() {
    _clickMenu("Forms");
    cy.contains("Form Layouts").click();
  }

  datePickerPage() {
    _clickMenu("Forms");
    cy.contains("Datepicker").click();
  }

  toastrPage() {
    _clickMenu("Modal & Overlays");
    cy.contains("Toastr").click();
  }

  smartTablePage() {
    _clickMenu("Tables & Data");
    cy.contains("Smart Table").click();
  }

  tooltipPage() {
    _clickMenu("Modal & Overlays");
    cy.contains("Tooltip").click();
  }
}

export const navigateTo = new NavigationPage();
