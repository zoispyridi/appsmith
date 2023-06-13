const dsl = require("../../../../../fixtures/chartCustomDataDsl.json");
import { entityExplorer } from "../../../../../support/Objects/ObjectsCore";

describe("Chart Widget Functionality around custom chart data", function () {
  before(() => {
    cy.addDsl(dsl);
  });

  it("1. change chart type to custom chart", function () {
    const value1 = 40;
    entityExplorer.ExpandCollapseEntity("Widgets");
    entityExplorer.SelectEntityByName("Test", "Container3");
    cy.UpdateChartType("Custom chart");
    //change chart value via input widget and validate
    enterAndTest("inputwidgetv2", value1, value1);
    cy.wait(400);
    cy.get(".t--draggable-chartwidget")
      .get("[class^=raphael-group-][class$=-tracker]")
      .trigger("mouseover");
    cy.wait(400);
    cy.get(".t--draggable-chartwidget .fc__tooltip.fusioncharts-div").should(
      "have.text",
      `${value1} %`,
    );
  });

  function enterAndTest(widgetName, text, expected) {
    cy.get(`.t--widget-${widgetName} input`).clear();
    cy.wait(300);
    if (text) {
      cy.get(`.t--widget-${widgetName} input`).click().type(text);
    }
    cy.get(`.t--widget-${widgetName} input`).should("have.value", expected);
  }
});
