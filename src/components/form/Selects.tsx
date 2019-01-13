import * as React from "react";

type SelectOptionProps = {
  text: string;
  value: string;
  template?: string;
  templatePlaceholder?: string;
  group?: string;
  icon?: string;
  img?: string;
};

type SelectOptionsDataFunc = (
  callback: (options: Array<SelectOptionProps>) => void
) => void;

type SelectOptionsDataRequestProps = {
  url: string;
  method: "GET" | "POST";
  params?: any;
  schema: {
    textField: string;
    valueField: string;
    templateField?: string;
    templatePlaceholderField?: string;
    groupField?: string;
  };
};

type SelectOptionsType =
  | Array<SelectOptionProps>
  | SelectOptionsDataFunc
  | SelectOptionsDataRequestProps;

type SelectBaseProps = {
  multiple?: boolean;
  grouped?: boolean;
  options: SelectOptionsType;
  filterable?: boolean;
  class?: string;
} & InlineStyle;

type SelectBaseStates = {
  options: Array<SelectOptionProps>;
  filteredOptions: Array<SelectOptionProps>;
  selectedOpts: Array<SelectOptionProps>;
  active: boolean;
};

abstract class SelectBase<
  TProps extends SelectBaseProps = SelectBaseProps,
  TStates extends SelectBaseStates = SelectBaseStates
> extends React.Component<TProps, TStates> {}

export default class Select extends SelectBase {
  protected get rootClasses(): string {
    const classes: string[] = ["select", "dropdown-toggle"];
    this.props.class && classes.push(this.props.class);

    return classes.join(" ");
  }

  constructor(props: SelectBaseProps) {
    super(props);

    if (Select.optionsIsDatas(props.options)) {
      this.state = {
        options: props.options,
        filteredOptions: props.options,
        selectedOpts: [],
        active: false
      };
    } else if (Select.optionsIsDatasFunc(props.options)) {
      props.options(options => {
        this.state = {
          options: options,
          filteredOptions: options,
          selectedOpts: [],
          active: false
        };
      });
    } else {
      const _self = this;
      const xhr = new XMLHttpRequest();
      xhr.open(props.options.method, props.options.url, true);
      xhr.addEventListener("readystatechange", function(e) {
        console.log(this.status);
        if (this.readyState === 200) {
          const options = JSON.parse(xhr.responseText);
          _self.state = {
            options: options,
            filteredOptions: options,
            selectedOpts: [],
            active: false
          };
        }
      });

      if (props.options.params) {
        xhr.send(props.options.params);
      } else {
        xhr.send();
      }
    }
  }

  /**
   *
   *
   * @private
   * @param {SelectOptionsType} opts
   * @returns {opts is Array<SelectOptionProps>}
   * @memberof Select
   */
  private static optionsIsDatas(
    opts: SelectOptionsType
  ): opts is Array<SelectOptionProps> {
    return opts instanceof Array;
  }

  /**
   *
   *
   * @private
   * @param {SelectOptionsType} opts
   * @returns {opts is SelectOptionsDataFunc}
   * @memberof Select
   */
  private static optionsIsDatasFunc(
    opts: SelectOptionsType
  ): opts is SelectOptionsDataFunc {
    return opts instanceof Function;
  }

  private static optionsIsDatasRequestProps(
    opts: SelectOptionsType
  ): opts is SelectOptionsDataRequestProps {
    return (
      typeof opts === "object" && !(opts as SelectOptionsDataRequestProps).url
    );
  }

  private handleToggle(e: React.MouseEvent<HTMLLabelElement>) {
    console.log("toggle.");

    const target = e.currentTarget;
    const dropContainer = target.getElementsByClassName(
      "drop-container"
    )[0] as HTMLDivElement;

    const isActived = target.classList.contains("active-container");
    if (isActived) {
      target.classList.remove("active-container");
      dropContainer.style.display = "none";
    } else {
      target.classList.add("active-container", "focused");
      dropContainer.style.display = "initial";
    }

    e.preventDefault();
    e.stopPropagation();
  }

  private handleSelectFocus(e: React.FocusEvent<HTMLLabelElement>) {
    e.currentTarget.classList.add("focused");
    console.log("focused");
    e.preventDefault();
    e.stopPropagation();
  }

  private clickEventHandler?: (e: MouseEvent) => void;

  private handleMouseEnter(e: React.MouseEvent<HTMLLabelElement>) {
    if (this.clickEventHandler) {
      document.removeEventListener("click", this.clickEventHandler);
      this.clickEventHandler = undefined;
    }
  }

  private handleMouseLeave(evt: React.MouseEvent<HTMLLabelElement>) {
    const sourceTarget = evt.currentTarget;
    // const isActived = sourceTarget.classList.contains("active-container");

    const clickHandler = (e: MouseEvent) => {
      if (e.currentTarget !== sourceTarget) {
        const dropContainer = sourceTarget.getElementsByClassName(
          "drop-container"
        )[0] as HTMLDivElement;

        sourceTarget.classList.remove("active-container", "focused");

        dropContainer.style.display = "none";
      }

      document.removeEventListener("click", clickHandler);
      this.clickEventHandler = undefined;
    };

    document.addEventListener("click", clickHandler);
    this.clickEventHandler = clickHandler;
  }

  private handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const finding = e.target.value.trim();

    this.setState(preState => {
      return {
        filteredOptions:
          finding === ""
            ? preState.options
            : preState.options.filter(opt => opt.text.includes(finding))
      };
    });
  }

  private handleClearFilter(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    (e.currentTarget.parentElement!
      .previousSibling! as HTMLInputElement).value = "";
    this.setState(preState => {
      return { filteredOptions: preState.options };
    });
  }

  private handleSelectChange(e: React.MouseEvent<HTMLUListElement>) {
    const target = e.target as HTMLElement;
    e.currentTarget.childNodes.forEach(li =>
      (li as HTMLLIElement).classList.remove("active")
    );

    const parentNodeName = target.parentElement!.nodeName;
    if (parentNodeName === "A") {
      target.parentElement!.parentElement!.classList.add("active");
    } else {
      target.parentElement!.classList.add("active");
    }

    const selected = this.state.options.find(
      opt => opt.text === target.innerText
    );

    if (selected) {
      this.setState({ selectedOpts: [selected] });
    }
  }

  render() {
    return (
      <label
        data-role="select"
        className={this.rootClasses}
        style={this.props.style}
        onClick={e => this.handleToggle(e)}
        onFocus={e => this.handleSelectFocus(e)}
        onMouseLeave={e => this.handleMouseLeave(e)}
        onMouseEnter={e => this.handleMouseEnter(e)}
      >
        <div className="button-group" />
        <div className="select-input" style={{ position: "absolute" }}>
          {this.state.selectedOpts[0] ? this.state.selectedOpts[0].text : null}
        </div>
        <div
          className="drop-container"
          data-role="dropdown"
          data-role-dropdown="true"
          style={{ display: "none" }}
        >
          {!this.props.filterable ? null : (
            <div className="input">
              <input
                type="text"
                data-role-input="true"
                style={{ paddingRight: 0 }}
                tabIndex={-1}
                onClick={e => e.stopPropagation()}
                onChange={e => this.handleFilter(e)}
              />
              <div className="button-group">
                <button
                  type="button"
                  className="button input-clear-button"
                  tabIndex={-1}
                  onClick={e => this.handleClearFilter(e)}
                >
                  <span className="default-icon-cross" />
                </button>
              </div>
            </div>
          )}

          <ul className="d-menu" onClick={e => this.handleSelectChange(e)}>
            {this.state.filteredOptions.map(opt => (
              <li key={opt.text} data-text={opt.text} data-value={opt.value}>
                <a>
                  {opt.icon ? (
                    <span
                      className={["icon", opt.icon].join(" ")}
                      style={{ marginTop: 0 }}
                    />
                  ) : opt.img ? (
                    <img src={opt.img} />
                  ) : null}
                  {opt.text}
                </a>
              </li>
            ))}
            <li />
          </ul>
          <select
            multiple={this.props.multiple || false}
            style={{ display: "none" }}
          >
            {this.state.filteredOptions.map(opt => (
              <option key={opt.text} value={opt.value}>
                {opt.text}
              </option>
            ))}
          </select>
        </div>
      </label>
    );
  }
}

export class SimpleSelect extends Select {}

export class SingleSelect extends Select {}

export class MultiSelect extends Select {}
