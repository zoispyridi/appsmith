import React from "react";
import { Flex } from "design-system";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Sidebar from "pages/Editor/IDE/Sidebar";
import LeftPane from "pages/Editor/IDE/LeftPane";
import BottomBar from "components/BottomBar";
import { previewModeSelector } from "selectors/editorSelectors";

const IDEWrapper = styled(Flex)`
  height: calc(
    100vh - ${(props) => props.theme.smallHeaderHeight} -
      ${(props) => props.theme.bottomBarHeight}
  );
  background-color: ${(props) => props.theme.appBackground};
`;

interface State {
  icon: string;
  title?: string;
  urlSuffix: string;
  component: React.ReactNode;
  paths: (path: string) => Array<string>;
}

interface Props {
  states: State[][];
}

const IDE = (props: Props) => {
  // eslint-disable-next-line no-console
  console.log({ props });
  const isPreviewMode = useSelector(previewModeSelector);
  return (
    <>
      <IDEWrapper className="relative w-full overflow-x-hidden">
        <Sidebar />
        <LeftPane />
      </IDEWrapper>
      <BottomBar viewMode={isPreviewMode} />
    </>
  );
};

export default IDE;
