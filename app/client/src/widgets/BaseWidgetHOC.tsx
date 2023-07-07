import { EditorContext } from "components/editorComponents/EditorContextProvider";
import type { EditorContextType } from "components/editorComponents/EditorContextProvider";
import type { Context } from "react";
import React from "react";
import { getAutoLayoutProps } from "./AutoLayoutBaseWidget";

import type { WidgetProps, WidgetState } from "./BaseWidget";
import BaseWidget from "./BaseWidget";
import { getFixedLayoutProps } from "./FixedLayoutBaseWidget";

export const withBaseWidgetHOC = (WrappedWidget: typeof BaseWidget) => {
  abstract class BaseWidgetHOC extends BaseWidget<WidgetProps, WidgetState> {
    static contextType = EditorContext;
    context!: React.ContextType<Context<EditorContextType<Cache>>>;

    render() {
      let additionalProps = {};
      if (this.props.isFlexChild) {
        additionalProps = getAutoLayoutProps(this.props, this);
      } else {
        additionalProps = getFixedLayoutProps(this.props, this);
      }

      return <WrappedWidget {...this.props} {...additionalProps} />;
    }
  }

  return BaseWidgetHOC;
};
