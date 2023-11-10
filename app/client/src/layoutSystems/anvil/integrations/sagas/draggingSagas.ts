import {
  type ReduxAction,
  ReduxActionErrorTypes,
} from "@appsmith/constants/ReduxActionConstants";
import { BlueprintOperationTypes } from "WidgetProvider/constants";
import { updateAndSaveLayout } from "actions/pageActions";
import log from "loglevel";
import type { CanvasWidgetsReduxState } from "reducers/entityReducers/canvasWidgetsReducer";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { getUpdateDslAfterCreatingChild } from "sagas/WidgetAdditionSagas";
import { executeWidgetBlueprintBeforeOperations } from "sagas/WidgetBlueprintSagas";
import { getWidgets } from "sagas/selectors";
import type {
  AnvilHighlightInfo,
  LayoutProps,
  WidgetLayoutProps,
} from "../../utils/anvilTypes";
import { addWidgetsToPreset } from "../../utils/layouts/update/additionUtils";
import { moveWidgets } from "../../utils/layouts/update/moveUtils";
import { AnvilReduxActionTypes } from "../actions/actionTypes";
import { generateDefaultLayoutPreset } from "layoutSystems/anvil/layoutComponents/presets/DefaultLayoutPreset";
import { selectWidgetInitAction } from "actions/widgetSelectionActions";
import { SelectionRequestType } from "sagas/WidgetSelectUtils";
import { addWidgetsToSection } from "layoutSystems/anvil/utils/layouts/update/sectionUtils";
import { addWidgetsToMainCanvasLayout } from "layoutSystems/anvil/utils/layouts/update/mainCanvasLayoutUtils";
import type { WidgetProps } from "widgets/BaseWidget";
import { MAIN_CONTAINER_WIDGET_ID } from "constants/WidgetConstants";

function* addWidgetsSaga(
  actionPayload: ReduxAction<{
    highlight: AnvilHighlightInfo;
    isMainCanvas?: boolean;
    isSection?: boolean;
    newWidget: {
      width: number;
      height: number;
      newWidgetId: string;
      type: string;
    };
  }>,
) {
  try {
    const start = performance.now();
    const { highlight, isMainCanvas, isSection, newWidget } =
      actionPayload.payload;
    const { alignment, canvasId } = highlight;
    const allWidgets: CanvasWidgetsReduxState = yield select(getWidgets);

    // Execute Blueprint operation to update widget props before creation.
    const newParams: { [key: string]: any } = yield call(
      executeWidgetBlueprintBeforeOperations,
      BlueprintOperationTypes.UPDATE_CREATE_PARAMS_BEFORE_ADD,
      {
        parentId: canvasId,
        widgetId: newWidget.newWidgetId,
        widgets: allWidgets,
        widgetType: newWidget.type,
      },
    );
    const updatedParams: any = { ...newWidget, ...newParams };

    // Create and add widget.
    let updatedWidgets: CanvasWidgetsReduxState = yield call(
      getUpdateDslAfterCreatingChild,
      {
        ...updatedParams,
        widgetId: canvasId,
      },
    );

    const draggedWidgets: WidgetLayoutProps[] = [
      {
        alignment,
        widgetId: newWidget.newWidgetId,
        widgetType: newWidget.type,
      },
    ];

    if (!!isMainCanvas) {
      updatedWidgets = addWidgetToMainCanvas(
        updatedWidgets,
        draggedWidgets,
        highlight,
        newWidget.newWidgetId,
      );
    } else if (!!isSection) {
      updatedWidgets = addWidgetToSection(
        updatedWidgets,
        draggedWidgets,
        highlight,
        newWidget.newWidgetId,
      );
    } else {
      updatedWidgets = addWidgetToGenericLayout(
        updatedWidgets,
        draggedWidgets,
        highlight,
        newWidget,
      );
    }

    yield put(updateAndSaveLayout(updatedWidgets));
    yield put(
      selectWidgetInitAction(SelectionRequestType.One, [newWidget.newWidgetId]),
    );
    log.debug("Anvil : add new widget took", performance.now() - start, "ms");
  } catch (error) {
    yield put({
      type: ReduxActionErrorTypes.WIDGET_OPERATION_ERROR,
      payload: {
        action: AnvilReduxActionTypes.ANVIL_ADD_NEW_WIDGET,
        error,
      },
    });
  }
}

function addWidgetToMainCanvas(
  allWidgets: CanvasWidgetsReduxState,
  draggedWidgets: WidgetLayoutProps[],
  highlight: AnvilHighlightInfo,
  widgetId: string,
) {
  let updatedWidgets: CanvasWidgetsReduxState = { ...allWidgets };
  updatedWidgets = {
    ...updatedWidgets,
    [highlight.canvasId]: {
      ...updatedWidgets[highlight.canvasId],
      children: updatedWidgets[highlight.canvasId].children?.filter(
        (each: string) => each !== widgetId,
      ),
    },
  };
  return addWidgetsToMainCanvasLayout(
    updatedWidgets,
    draggedWidgets,
    highlight,
  );
}

function addWidgetToSection(
  allWidgets: CanvasWidgetsReduxState,
  draggedWidgets: WidgetLayoutProps[],
  highlight: AnvilHighlightInfo,
  widgetId: string,
) {
  /**
   * Add new widgets to section.
   */
  const canvasWidget: WidgetProps = allWidgets[highlight.canvasId];
  const canvasPreset: LayoutProps[] = canvasWidget.layout
    ? canvasWidget.layout
    : generateDefaultLayoutPreset();
  const res: {
    canvasWidgets: CanvasWidgetsReduxState;
    section: WidgetProps;
  } = addWidgetsToSection(
    allWidgets,
    draggedWidgets,
    highlight,
    allWidgets[canvasWidget.parentId || MAIN_CONTAINER_WIDGET_ID],
    {
      ...canvasWidget,
      children: canvasWidget.children.filter(
        (each: string) => each !== widgetId,
      ),
    },
    canvasPreset[0],
  );
  return res.canvasWidgets;
}

function addWidgetToGenericLayout(
  allWidgets: CanvasWidgetsReduxState,
  draggedWidgets: WidgetLayoutProps[],
  highlight: AnvilHighlightInfo,
  newWidget: {
    width: number;
    height: number;
    newWidgetId: string;
    type: string;
  },
) {
  const canvasWidget = allWidgets[highlight.canvasId];
  const canvasLayout = canvasWidget.layout
    ? canvasWidget.layout
    : generateDefaultLayoutPreset();
  /**
   * Add new widget to the children of parent canvas.
   * Also add it to parent canvas' layout.
   */
  return {
    ...allWidgets,
    [canvasWidget.widgetId]: {
      ...canvasWidget,
      layout: addWidgetsToPreset(canvasLayout, highlight, draggedWidgets),
    },
    [newWidget.newWidgetId]: {
      ...allWidgets[newWidget.newWidgetId],
      // This is a temp fix, widget dimensions will be self computed by widgets
      height: newWidget.height,
      width: newWidget.width,
    },
  };
}

/**
 * Remove widgets from current parents and layouts.
 * Add to new parent and layout.
 */
function* moveWidgetsSaga(
  actionPayload: ReduxAction<{
    highlight: AnvilHighlightInfo;
    movedWidgets: string[];
  }>,
) {
  try {
    const start = performance.now();
    const { highlight, movedWidgets } = actionPayload.payload;
    const allWidgets: CanvasWidgetsReduxState = yield select(getWidgets);
    const updatedWidgets: CanvasWidgetsReduxState = moveWidgets(
      allWidgets,
      movedWidgets,
      highlight,
    );
    yield put(updateAndSaveLayout(updatedWidgets));
    log.debug("Anvil : moving widgets took", performance.now() - start, "ms");
  } catch (error) {
    yield put({
      type: ReduxActionErrorTypes.WIDGET_OPERATION_ERROR,
      payload: {
        action: AnvilReduxActionTypes.ANVIL_MOVE_WIDGET,
        error,
      },
    });
  }
}

export default function* anvilDraggingSagas() {
  yield all([
    takeLatest(AnvilReduxActionTypes.ANVIL_ADD_NEW_WIDGET, addWidgetsSaga),
    takeLatest(AnvilReduxActionTypes.ANVIL_MOVE_WIDGET, moveWidgetsSaga),
  ]);
}
