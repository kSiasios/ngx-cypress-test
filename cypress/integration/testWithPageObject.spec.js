import { onDatePickerPage } from "../support/page_objects/datePickerPage";
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage";
import { navigateTo } from "../support/page_objects/navigationPage";
import { onSmartTablePage } from "../support/page_objects/smartTablePage";

describe("Test with Page Objects", () => {
  beforeEach("open application", () => {
    // cy.visit("/");
    cy.openHomePage();
  });

  it("Verify Navigations across the pages", () => {
    navigateTo.formLayoutsPage();
    // cy.wait(1000);
    navigateTo.datePickerPage();
    // cy.wait(1000);
    navigateTo.toastrPage();
    // cy.wait(1000);
    navigateTo.smartTablePage();
    // cy.wait(1000);
    navigateTo.tooltipPage();
  });

  it.only(" should submit Inline and Basic form and select tomorrow date in the calendar", () => {
    // navigateTo.formLayoutsPage();
    // onFormLayoutsPage.submitInlineForm(
    //   "Konstantinos Siasios",
    //   "ksiasios@uth.gr",
    //   false
    // );
    // onFormLayoutsPage.submitBasicForm("ksiasios@uth.gr", "12345", true);

    // navigateTo.datePickerPage();

    // // tomorrow date
    // const tomorrow = new Date();
    // tomorrow.setDate(tomorrow.getDate() + 1);

    // const futureDate = new Date();
    // futureDate.setDate(tomorrow.getDate() + 25);
    // onDatePickerPage.selectDateOnCommonDatepicker(tomorrow);
    // // onDatePickerPage.selectDaysFromTodayOnCommonDatepicker(58);

    // onDatePickerPage.selectDateWithRange(tomorrow, futureDate);
    // // onDatePickerPage.selectDateWithRangeOnDaysFromToday(5, 15);

    navigateTo.smartTablePage();
    onSmartTablePage.insertObjectToSmartTable();
    onSmartTablePage.modifyObjectByValue("Larry", { lastName: "Bombotrack" });
    onSmartTablePage.deleteObjectOfValue("john@doe.com");
    onSmartTablePage.deleteObjectByIndex(5);
  });
});
