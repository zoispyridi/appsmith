import React from "react";
import styled from "styled-components";

export const LeftPaneContainer = styled.div`
  height: 100%;
  border-right: 1px solid var(--ads-v2-color-border);
  background: var(--ads-v2-color-bg);
`;

const LeftPane = () => {
  return <LeftPaneContainer />;
};

export default LeftPane;
