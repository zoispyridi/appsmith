//This File contains all the types that are common types required in layout System's CanvasArenas

//WidgetDraggingBlock contains information related to a dragging widget,
//that is used in computing logic to enable drag and drop of the particular widget
export interface WidgetDraggingBlock {
  left: number;
  top: number;
  width: number;
  height: number;
  columnWidth: number;
  rowHeight: number;
  widgetId: string;
  isNotColliding: boolean;
  detachFromLayout?: boolean;
  fixedHeight?: number;
  type: string;
}

//Simple Type used to define co-ordinates
export interface XYCord {
  x: number;
  y: number;
}
