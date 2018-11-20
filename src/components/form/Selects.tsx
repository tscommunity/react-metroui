import * as React from "react";

type SelectOptionProps = {
  text: string;
  value: string;
  template?: string;
  templatePlaceholder?: string;
  group?: string;
};

type SelectBaseProps = {
  multiple?: boolean;
  grouped?: boolean;
  options:
    | Array<SelectOptionProps>
    | ((callback: (options: Array<SelectOptionProps>) => void) => void)
    | {
        url: string;
        method: "GET" | "POST";
        params: any;
        schema: {
          textField: string;
          valueField: string;
          templateField?: string;
          templatePlaceholderField?: string;
          groupField?: string;
        };
      };
};

type SelectBaseStates = {};

abstract class SelectBase<
  TProps extends SelectBaseProps = SelectBaseProps,
  TStates extends SelectBaseStates = SelectBaseStates
> extends React.Component<TProps, TStates> {}

export default class Select extends SelectBase {
  render() {
    return <label />;
  }
}

export class SingleSelect extends Select {}

export class MultiSelect extends Select {}
