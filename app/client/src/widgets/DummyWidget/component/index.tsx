import React from "react";
import ReactDOM from "react-dom";
import { AddScriptTo, ScriptStatus, useScript } from "utils/hooks/useScript";

function DummyComponent(props: DummyComponentProps) {
  // const status1 = useScript(
  //   "https://unpkg.com/react@16.12/umd/react.development.js",
  //   AddScriptTo.HEAD,
  // );
  // const statusX = useScript(
  //   "https://unpkg.com/react-dom@16.7/umd/react-dom.development.js",
  //   AddScriptTo.HEAD,
  // );
  const status2 = useScript(
    "https://unpkg.com/dayjs@1.11.7/dayjs.min.js",
    AddScriptTo.HEAD,
  );

  const status3 = useScript(
    "https://cdnjs.cloudflare.com/ajax/libs/antd/5.0.5/antd.min.js",
    AddScriptTo.HEAD,
  );

  if (
    // status1 === ScriptStatus.READY &&
    status2 === ScriptStatus.READY &&
    status3 === ScriptStatus.READY
    // statusX === ScriptStatus.READY
  ) {
    window.React = React;
    window.ReactDOM = ReactDOM;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const Button = window.antd.Button;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // const Select = window.antd.Select;

    return <Button>Click me</Button>;
    // return <Select />;
  }

  return null;
}

export type DummyComponentProps = Record<string, unknown>;

export default DummyComponent;
