import React from "react";
import List from "./List";
import QueryEditor from "pages/Editor/QueryEditor";
import type { RouteComponentProps } from "react-router";

const FullScreenQuery = (props: RouteComponentProps<{ pageId: string }>) => {
  return (
    <div className="testthis">
      <List />
      <QueryEditor {...props} />
    </div>
  );
};

export default FullScreenQuery;
