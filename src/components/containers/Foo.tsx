import * as React from "react";

type PropsType = {
  name: string;
} & SealedComponent;

export class Foo extends React.Component<PropsType, {}> {
  render() {
    return (
      <h2>
        {this.props.name}
        {this.props.children}
      </h2>
    );
  }
}
