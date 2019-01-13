import * as React from "react";
import { ToolButton } from "./Buttons";

export default class Toolbar extends React.Component<{
  children?: RestrictChildrenOf<ToolButton>;
}> {
  render() {
    return <div className="toolbar">{this.props.children}</div>;
  }
}
