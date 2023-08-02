import { getWidgetSelector } from "../../../../../locators/WidgetLocators";
import {
  agHelper,
  propPane,
  entityExplorer,
  draggableWidgets,
  locators,
  deployMode,
} from "../../../../../support/Objects/ObjectsCore";



describe("Range Slider spec", () => {
  before(() => {
    entityExplorer.DragDropWidgetNVerify("rangesliderwidget", 550, 100);
    entityExplorer.DragDropWidgetNVerify("textwidget", 300, 300);
    entityExplorer.DragDropWidgetNVerify("textwidget", 600, 300);
    entityExplorer.SelectEntityByName("Text1");
    propPane.UpdatePropertyFieldValue("Text", "{{RangeSlider1.end}}");
    entityExplorer.SelectEntityByName("Text2");
    propPane.UpdatePropertyFieldValue("Text", "{{RangeSlider1.start}}");
  });

  it("1. Verify properties and default values", () => {
    const dataSectionProperties = [
      "min\\.value",
      "max\\.value",
      "stepsize",
      "min\\.range",
      "defaultstartvalue",
      "defaultendvalue",
    ];
    const generalProperties = [
      "showmarks",
      "marks",
      "visible",
      "disabled",
      "animateloading",
      "showvaluealways",
    ];
    const eventsProperties = ["onstartvaluechange", "onendvaluechange"];

    entityExplorer.SelectEntityByName("RangeSlider1", "Widgets");
    // Data Section properties
    dataSectionProperties.forEach((dataSectionProperty) => {
      agHelper.AssertElementVisible(
        propPane._propertyPanePropertyControl(
          "data",
          `${dataSectionProperty}`,
        ),
      );
    });
    // General Section Properties
    generalProperties.forEach((generalProperty) => {
      agHelper.AssertElementVisible(
        propPane._propertyPanePropertyControl(
          "general",
          `${generalProperty}`,
        ),
      );
    });
    // Events Section properties
    eventsProperties.forEach((eventsProperty) => {
      agHelper.AssertElementVisible(
        propPane._propertyPanePropertyControl("events", `${eventsProperty}`),
      );
    });
    // Style Section properties
    propPane.MoveToTab("Style");
    propPane._propertyControl("size");
    agHelper.AssertElementVisible(
      propPane._propertyPanePropertyControl("color", "fillcolor"),
    );

    propPane.MoveToTab("Content");
    // Verify default value
    propPane
      .EvaluateExistingPropertyFieldValue("Min. value")
      .then((val: any) => {
        expect(val).to.eq("0");
      });
    propPane
      .EvaluateExistingPropertyFieldValue("Max. value")
      .then((val: any) => {
        expect(val).to.eq("100");
      });
    propPane
      .EvaluateExistingPropertyFieldValue("Step size")
      .then((val: any) => {
        expect(val).to.eq("1");
      });
    propPane
      .EvaluateExistingPropertyFieldValue("Min. range")
      .then((val: any) => {
        expect(val).to.eq("5");
      });
  });

  it("2. Validates Min. value", () => {
    propPane.UpdatePropertyFieldValue("Min. value", "110");

    agHelper.VerifyEvaluatedErrorMessage(
      "This value must be less than max value",
    );

    propPane.UpdatePropertyFieldValue("Min. value", "");

    agHelper.VerifyEvaluatedErrorMessage("This value is required");

    propPane.UpdatePropertyFieldValue("Min. value", "zero");

    agHelper.VerifyEvaluatedErrorMessage("This value must be a number");

    propPane.UpdatePropertyFieldValue("Min. value", "0");
    agHelper.AssertElementAbsence(locators._evaluatedErrorMessage);

  });

  it("3. Validates Max. value", () => {
    propPane.UpdatePropertyFieldValue("Max. value", "0");

    agHelper.VerifyEvaluatedErrorMessage(
      "This value must be greater than min value",
    );

    propPane.UpdatePropertyFieldValue("Max. value", "");

    agHelper.VerifyEvaluatedErrorMessage("This value is required");

    propPane.UpdatePropertyFieldValue("Max. value", "asd");

    agHelper.VerifyEvaluatedErrorMessage("This value must be a number");

    propPane.UpdatePropertyFieldValue("Max. value", "100");
    agHelper.AssertElementAbsence(locators._evaluatedErrorMessage);

  });

  it("4. Validates Step size", () => {
    propPane.UpdatePropertyFieldValue("Step size", "10");

    agHelper.VerifyEvaluatedErrorMessage(
      "This value must be less than or equal to minRange",
    );

    propPane.UpdatePropertyFieldValue("Step size", "");

    agHelper.VerifyEvaluatedErrorMessage("This value is required");

    propPane.UpdatePropertyFieldValue("Step size", "asd");

    agHelper.VerifyEvaluatedErrorMessage("This value must be a number");

    propPane.UpdatePropertyFieldValue("Step size", "1");
    agHelper.AssertElementAbsence(locators._evaluatedErrorMessage);

  });

  it("5. Validates Min Range", () => {
    propPane.UpdatePropertyFieldValue("Min. range", "0");

    agHelper.VerifyEvaluatedErrorMessage(
      "This value must be greater than 0.1",
    );

    propPane.UpdatePropertyFieldValue("Min. range", "-10");

    agHelper.VerifyEvaluatedErrorMessage(
      "This value must be greater than 0.1",
    );

    propPane.UpdatePropertyFieldValue("Min. range", "asd");

    agHelper.VerifyEvaluatedErrorMessage("This value must be a number");

    propPane.UpdatePropertyFieldValue("Min. range", "110");

    agHelper.VerifyEvaluatedErrorMessage("This value must be less than 100");

    propPane.UpdatePropertyFieldValue("Min. range", "10");
    agHelper.AssertElementAbsence(locators._evaluatedErrorMessage);

  });

  it("6. Validates Default start value", () => {
    propPane.UpdatePropertyFieldValue("Default start value", "-100");

    agHelper.VerifyEvaluatedErrorMessage(
      "This value must be greater than or equal to the min value",
    );

    propPane.UpdatePropertyFieldValue("Default start value", "110");

    agHelper.VerifyEvaluatedErrorMessage(
      "This value must be less than defaultEnd value",
    );

    propPane.UpdatePropertyFieldValue("Default start value", "asd");

    agHelper.VerifyEvaluatedErrorMessage("This value must be a number");

    propPane.UpdatePropertyFieldValue("Default start value", "10");
    agHelper.AssertElementAbsence(locators._evaluatedErrorMessage);
  });

  it("7. Validates Default end value", () => {
    propPane.UpdatePropertyFieldValue("Default end value", "-10");

    agHelper.VerifyEvaluatedErrorMessage(
      "This value must be greater than defaultStart value",
    );

    propPane.UpdatePropertyFieldValue("Default end value", "110");

    agHelper.VerifyEvaluatedErrorMessage(
      "This value must be less than or equal to the max value",
    );

    propPane.UpdatePropertyFieldValue("Default end value", "asd");

    agHelper.VerifyEvaluatedErrorMessage("This value must be a number");

    propPane.UpdatePropertyFieldValue("Default end value", "100");
    agHelper.AssertElementAbsence(locators._evaluatedErrorMessage);
  });

  it("8. Change Step size and check if binding value changes", () => {
    // Assert Text widget has value 10
    agHelper
      .GetText(getWidgetSelector(draggableWidgets.TEXT), "text", 1)
      .then(($label) => {
        expect($label).to.eq("10");
      });

    agHelper
      .GetText(getWidgetSelector(draggableWidgets.TEXT), "text", 0)
      .then(($label) => {
        expect($label).to.eq("100");
      });

    // Change the Step size to 10
    propPane.UpdatePropertyFieldValue("Min. range", "10", true, false);
    propPane.UpdatePropertyFieldValue("Step size", "10", true, false);

    agHelper
      .GetElement(locators._sliderThumb)
      .eq(0)
      .focus()
      .type("{rightArrow}")
      .wait(500);

    // Assert the Text widget has value 20
    agHelper
      .GetText(getWidgetSelector(draggableWidgets.TEXT), "text", 1)
      .then(($label) => {
        expect($label).to.eq("20");
      });

    // Change the slider value
    agHelper
      .GetElement(locators._sliderThumb)
      .eq(1)
      .focus()
      .type("{leftArrow}")
      .type("{leftArrow}");

    agHelper.Sleep(200);

    agHelper
      .GetText(getWidgetSelector(draggableWidgets.TEXT), "text", 0)
      .then(($label) => {
        expect($label).to.eq("80");
      });
  });

  it("9. Verify Range slider visibility in explorer", () => {
    entityExplorer.NavigateToSwitcher("Widgets");
    agHelper.ClearTextField(locators._entityExplorersearch);
    agHelper.TypeText(locators._entityExplorersearch, "Range");
    agHelper.AssertElementExist(
      locators._widgetPageIcon("rangesliderwidget"),
    );
    agHelper.ClearTextField(locators._entityExplorersearch);
    agHelper.TypeText(locators._entityExplorersearch, "slider");
    agHelper.AssertElementExist(
      locators._widgetPageIcon("rangesliderwidget"),
    );
  });

  it("10. Min value tests", () => {
    // Allows negative value and validate
    entityExplorer.SelectEntityByName("RangeSlider1");
    propPane.UpdatePropertyFieldValue("Min. value", "-10");
    agHelper.AssertElementAbsence(locators._evaluatedErrorMessage);

    // Verify in Preview mode negative value
    agHelper.GetNClick(locators._enterPreviewMode);
    agHelper
      .GetElement(locators._sliderThumb)
      .eq(0)
      .focus()
      .type("{leftArrow}{leftArrow}{leftArrow}");
    agHelper.Sleep(2000);
    agHelper
      .GetText(getWidgetSelector(draggableWidgets.TEXT), "text", 1)
      .then(($label) => {
        expect($label).to.eq("-10");
      });
    agHelper.GetNClick(locators._exitPreviewMode);

    // Verify in Deploy mode negative value
    deployMode.DeployApp();
    agHelper
      .GetElement(locators._sliderThumb)
      .eq(0)
      .focus()
      .type("{leftArrow}{leftArrow}");
    agHelper
      .GetText(getWidgetSelector(draggableWidgets.TEXT), "text", 1)
      .then(($label) => {
        expect($label).to.eq("-10");
      });
    deployMode.NavigateBacktoEditor();

    // Allows decimal value
    entityExplorer.SelectEntityByName("RangeSlider1");
    propPane.UpdatePropertyFieldValue("Min. value", "10.5");

    // Verify Decimal value
    agHelper
      .GetElement(locators._sliderThumb)
      .eq(0)
      .focus()
      .type("{leftArrow}");
    agHelper
      .GetText(getWidgetSelector(draggableWidgets.TEXT), "text", 1)
      .then(($label) => {
        expect($label).to.eq("10.5");
      });
    // Does not allow value greater than Max value
    propPane.UpdatePropertyFieldValue("Min. value", "110");
    agHelper.VerifyEvaluatedErrorMessage(
      "This value must be less than max value",
    );
    // Updating to allowed value
    propPane.UpdatePropertyFieldValue("Min. value", "10");
  });

  it("11. Max value tests", () => {
    // Allows decimal value
    propPane.UpdatePropertyFieldValue("Max. value", "100.5");
    // Verify decimal value
    agHelper
      .GetElement(locators._sliderThumb)
      .eq(1)
      .focus()
      .type("{rightArrow}");
    agHelper
      .GetText(getWidgetSelector(draggableWidgets.TEXT), "text", 0)
      .then(($label) => {
        expect($label).to.eq("100.5");
      });
    // Does not allow value less than min value
    propPane.UpdatePropertyFieldValue("Max. value", "-20");
    agHelper.VerifyEvaluatedErrorMessage(
      "This value must be greater than min value",
    );
    // Accepts negative value
    propPane.UpdatePropertyFieldValue("Min. value", "-50");
    agHelper.AssertElementAbsence(locators._evaluatedErrorMessage);
    propPane.UpdatePropertyFieldValue("Max. value", "-30");
    agHelper.AssertElementAbsence(locators._evaluatedErrorMessage);

    agHelper
      .GetElement(locators._sliderThumb)
      .eq(1)
      .focus()
      .type("{rightArrow}{rightArrow}{rightArrow}");
    agHelper
      .GetText(getWidgetSelector(draggableWidgets.TEXT), "text", 0)
      .then(($label) => {
        expect($label).to.eq("-30");
      });

    // Verify in Preview mode negative value
    agHelper.GetNClick(locators._enterPreviewMode);
    agHelper
      .GetElement(locators._sliderThumb)
      .eq(1)
      .focus()
      .type("{rightArrow}");
    agHelper.Sleep(2000);
    agHelper
      .GetText(getWidgetSelector(draggableWidgets.TEXT), "text", 0)
      .then(($label) => {
        expect($label).to.eq("-30");
      });
    agHelper.GetNClick(locators._exitPreviewMode);

    // Verify in Deploy mode negative value
    deployMode.DeployApp();
    agHelper
      .GetElement(locators._sliderThumb)
      .eq(1)
      .focus()
      .type("{rightArrow}");
    agHelper
      .GetText(getWidgetSelector(draggableWidgets.TEXT), "text", 0)
      .then(($label) => {
        expect($label).to.eq("-30");
      });
    deployMode.NavigateBacktoEditor();
  });

  it("12. Step size tests", () => {
    // Does not allow value less than 0.1
    entityExplorer.SelectEntityByName("RangeSlider1");
    propPane.UpdatePropertyFieldValue("Step size", "0");
    agHelper.VerifyEvaluatedErrorMessage(
      "This value must be greater than 0.1",
    );
    // Does not allow negative value
    propPane.UpdatePropertyFieldValue("Step size", "-10");
    agHelper.VerifyEvaluatedErrorMessage(
      "This value must be greater than 0.1",
    );
    propPane.UpdatePropertyFieldValue("Step size", "5");
    // Does not allow value greater than max value
    propPane.UpdatePropertyFieldValue("Max. value", "100");
    agHelper.AssertElementAbsence(locators._evaluatedErrorMessage);
    propPane.UpdatePropertyFieldValue("Min. value", "10");
    agHelper.AssertElementAbsence(locators._evaluatedErrorMessage);
    propPane.UpdatePropertyFieldValue("Step size", "110");
    agHelper.VerifyEvaluatedErrorMessage("This value must be less than 90");
  });

  it("13. Min range test", () => {
    // Does not accept value less than step size
    propPane.UpdatePropertyFieldValue("Step size", "5");
    propPane.UpdatePropertyFieldValue("Min. range", "2");
    agHelper.VerifyEvaluatedErrorMessage(
      "This value must be greater than or equal to step size",
    );
  });
});
