import "./styles.css";
import { Flex } from "@design-system/widgets";
import type {
  AlignSelf,
  FlexDirection,
  FlexProps,
  FlexWrap,
  JustifyContent,
  Responsive,
  SizingDimension,
  SpacingDimension,
} from "@design-system/widgets";
import React, { useMemo } from "react";
import type { CSSProperties, ReactNode } from "react";
import type {
  OverflowValues,
  PositionValues,
} from "layoutSystems/anvil/utils/types";
import { usePositionObserver } from "layoutSystems/common/utils/LayoutElementPositionsObserver/usePositionObserver";
import { getAnvilLayoutDOMId } from "layoutSystems/common/utils/LayoutElementPositionsObserver/utils";
import { type RenderMode, RenderModes } from "constants/WidgetConstants";
import type { LayoutComponentTypes } from "layoutSystems/anvil/utils/anvilTypes";
import styled from "styled-components";
import { generateReactKey } from "widgets/WidgetUtils";

export const FLEX_LAYOUT_PADDING = 4;

const StyledFlex = styled(Flex)<{ $key: string }>`
  color: ${(props) => `#${props.$key}`};
  ${(props) =>
    props.direction === "row"
      ? `&:has(.anvil-widget-wrapper [data-field-label-wrapper])
    .anvil-widget-wrapper:not(:has([data-field-label-wrapper])) {
    margin-top: calc(var(--inner-spacing-2) + var(--sizing-3));`
      : ``}
  }
`;

export interface FlexLayoutProps
  extends AlignSelf,
    JustifyContent,
    FlexDirection,
    FlexWrap {
  canvasId: string;
  children: ReactNode;
  isContainer?: boolean;
  isDropTarget?: boolean;
  layoutId: string;
  layoutType: LayoutComponentTypes;
  layoutIndex: number;
  parentDropTarget: string;
  renderMode: RenderMode;

  border?: string;
  columnGap?: Responsive<SpacingDimension>;
  containerType?: string;
  flexBasis?: Responsive<SizingDimension>;
  flexGrow?: Responsive<number>;
  flexShrink?: Responsive<number>;
  height?: Responsive<SizingDimension>;
  maxHeight?: Responsive<SizingDimension>;
  maxWidth?: Responsive<SizingDimension>;
  minWidth?: Responsive<SizingDimension>;
  minHeight?: Responsive<SizingDimension>;
  overflowX?: OverflowValues;
  overflowY?: OverflowValues;
  position?: PositionValues;
  rowGap?: Responsive<SpacingDimension>;
  padding?: Responsive<SpacingDimension>;
  width?: Responsive<SizingDimension>;
}

export const FlexLayout = React.memo((props: FlexLayoutProps) => {
  const {
    alignSelf,
    border,
    canvasId,
    children,
    columnGap,
    direction,
    flexBasis,
    flexGrow,
    flexShrink,
    height,
    isContainer,
    isDropTarget,
    justifyContent,
    layoutId,
    layoutIndex,
    layoutType,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    padding,
    parentDropTarget,
    position,
    renderMode,
    rowGap,
    width,
    wrap,
  } = props;

  /** POSITIONS OBSERVER LOGIC */
  // Create a ref so that this DOM node can be
  // observed by the observer for changes in size
  const ref = React.useRef<HTMLDivElement>(null);
  usePositionObserver(
    "layout",
    {
      layoutId: layoutId,
      canvasId: canvasId,
      isDropTarget,
      layoutType,
      parentDropTarget,
    },
    ref,
  );
  /** EO POSITIONS OBSERVER LOGIC */

  const flexProps: FlexProps = useMemo(() => {
    return {
      alignSelf: alignSelf || "flex-start",
      columnGap: columnGap || "0px",
      direction: direction || "column",
      flexBasis: flexBasis || "auto",
      flexGrow: flexGrow || 0,
      flexShrink: flexShrink || 0,
      height: height || "auto",
      justifyContent: justifyContent || "start",
      maxHeight: maxHeight || "none",
      maxWidth: maxWidth || "none",
      minHeight: minHeight || "unset",
      minWidth: minWidth || "unset",
      padding: padding || (isDropTarget ? `${FLEX_LAYOUT_PADDING}px` : "0px"),
      rowGap: rowGap || "0px",
      width: width || "auto",
      wrap: wrap || "nowrap",
    };
  }, [
    alignSelf,
    columnGap,
    direction,
    flexBasis,
    flexGrow,
    flexShrink,
    justifyContent,
    height,
    isDropTarget,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    padding,
    rowGap,
    width,
    wrap,
  ]);

  const styleProps: CSSProperties = useMemo(() => {
    // The following properties aren't included in type FlexProps but can be passed as style.
    return {
      border:
        border ||
        (isDropTarget && renderMode === RenderModes.CANVAS
          ? "1px dashed #979797"
          : "none"),
      position: position || "relative",
    };
  }, [border, isDropTarget, position, renderMode]);

  const className = useMemo(() => {
    return `layout-${layoutId} layout-index-${layoutIndex} ${
      isContainer ? "make-container" : ""
    }`;
  }, [isContainer, layoutId, layoutIndex]);

  return (
    <StyledFlex
      {...flexProps}
      $key={generateReactKey()}
      className={className}
      id={getAnvilLayoutDOMId(canvasId, layoutId)}
      ref={ref}
      style={styleProps}
    >
      {children}
    </StyledFlex>
  );
});
