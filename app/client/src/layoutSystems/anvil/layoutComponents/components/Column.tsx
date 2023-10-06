import React from "react";
import { FlexLayout } from "./FlexLayout";
import {
  LayoutComponentTypes,
  type AnvilHighlightInfo,
  type LayoutComponentProps,
  type LayoutProps,
  type WidgetLayoutProps,
} from "layoutSystems/anvil/utils/anvilTypes";
import { doesLayoutRenderWidgets } from "layoutSystems/anvil/utils/layouts/typeUtils";
import { renderWidgets } from "layoutSystems/anvil/utils/layouts/renderUtils";
import { RenderModes } from "constants/WidgetConstants";
import {
  addChildToLayout,
  extractWidgetIdsFromLayoutProps,
  removeChildFromLayout,
} from "layoutSystems/anvil/utils/layouts/layoutUtils";

const Column = (props: LayoutComponentProps) => {
  const { canvasId, children, layoutId, layoutStyle } = props;

  return (
    <FlexLayout
      canvasId={canvasId}
      direction="column"
      layoutId={layoutId}
      {...(layoutStyle || {})}
    >
      {children}
    </FlexLayout>
  );
};

Column.type = LayoutComponentTypes.COLUMN;

Column.addChild = (
  props: LayoutProps,
  children: WidgetLayoutProps[] | LayoutProps[],
  highlight: AnvilHighlightInfo,
): LayoutProps => {
  return addChildToLayout(props, children, highlight);
};

Column.getChildTemplate = (props: LayoutProps): LayoutProps | undefined => {
  if (!props) return;
  const { childTemplate } = props;
  if (childTemplate) return childTemplate;
  return {
    insertChild: true,
    layoutId: "",
    layoutType: LayoutComponentTypes.ROW,
    layout: [],
  };
};

Column.deriveHighlights = () => {
  return [];
};

Column.extractChildWidgetIds = (props: LayoutProps): string[] => {
  return Column.rendersWidgets(props)
    ? extractWidgetIdsFromLayoutProps(props)
    : [];
};

Column.removeChild = (
  props: LayoutProps,
  child: WidgetLayoutProps | LayoutProps,
): LayoutProps | undefined => {
  return removeChildFromLayout(props, child);
};

Column.renderChildWidgets = (props: LayoutComponentProps): React.ReactNode => {
  return renderWidgets(
    Column.extractChildWidgetIds(props),
    props.childrenMap,
    props.renderMode || RenderModes.CANVAS,
  );
};

Column.rendersWidgets = (props: LayoutProps): boolean => {
  return doesLayoutRenderWidgets(props);
};

export default Column;
