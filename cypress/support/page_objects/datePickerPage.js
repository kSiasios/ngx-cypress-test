function selectDate(date, customDayCellSelector) {
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
        selectDate(date, customDayCellSelector);
      } else {
        cy.contains(customDayCellSelector, date.getDate()).click();
      }
    });

  return date.toLocaleString("default", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function selectDateRange(startDate, endDate) {
  const firstReturn = selectDate(
    startDate,
    "nb-calendar-range-day-cell [class='day-cell']"
  );
  const secondReturn = selectDate(
    endDate,
    "nb-calendar-range-day-cell [class='day-cell']"
  );
  return `${firstReturn} - ${secondReturn}`;
}

export class DatePickerPage {
  selectDateOnCommonDatepicker(date) {
    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        let returnValue = selectDate(date, "nb-calendar-day-cell");

        cy.wrap(input).invoke("prop", "value").should("contain", returnValue);
      });
  }
  selectDaysFromTodayOnCommonDatepicker(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    this.selectDateOnCommonDatepicker(date);
  }

  selectDateWithRange(startDate, endDate) {
    cy.contains("nb-card", "Datepicker With Range")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        const returnValue = selectDateRange(startDate, endDate);
        cy.wrap(input).invoke("prop", "value").should("contain", returnValue);
      });
  }
  selectDateWithRangeOnDaysFromToday(daysFromTodayStart, daysFromTodayEnd) {
    const startDate = new Date();
    const endDate = new Date();

    startDate.setDate(startDate.getDate() + daysFromTodayStart);
    endDate.setDate(endDate.getDate() + daysFromTodayEnd);
    this.selectDateWithRange(startDate, endDate);
  }
}

export const onDatePickerPage = new DatePickerPage();
