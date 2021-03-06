import * as React from "react";

type ButtonBaseProps<
  TElement extends HTMLElement = HTMLButtonElement
> = CommonProps & SupportedReactEventHandlers<TElement, "onClick">;

/**
 *
 *
 * @abstract
 * @class ButtonBase
 * @extends {React.Component<TProps, TStates>}
 * @template TProps
 * @template TStates
 * @template TElement
 */
abstract class ButtonBase<
  TProps extends ButtonBaseProps<TElement> = ButtonBaseProps<TElement>,
  TStates = {},
  TElement extends HTMLElement = HTMLButtonElement
> extends React.Component<TProps, TStates> {
  /**
   *
   *
   * @protected
   * @type {string}
   * @memberof ButtonBase
   */
  protected basicClasses: string = "button";

  /**
   *
   *
   * @protected
   * @returns {JSX.Element}
   * @memberof ButtonBase
   */
  protected renderChildren?(): JSX.Element;

  /**
   *
   *
   * @readonly
   * @protected
   * @type {string}
   * @memberof ButtonBase
   */
  protected get rootClasses(): string {
    const classes: string[] = [];
    classes.push(this.basicClasses);
    this.props.outline === true && classes.push("outline");
    this.props.round === true && classes.push("rounded");
    this.props.size && classes.push(this.props.size!);
    this.props.class && classes.push(this.props.class!);
    return classes.join(" ");
  }

  render() {
    if (this.props.children) {
      return (
        <button
          className={this.rootClasses}
          style={this.props.style}
          onClick={this.props.onClick as any}
        >
          {this.props.children}
        </button>
      );
    }

    return (
      <button
        className={this.rootClasses}
        style={this.props.style}
        onClick={this.props.onClick as any}
      >
        {this.renderChildren && this.renderChildren()}
      </button>
    );
  }
}

type ButtonProps = {
  icon?: string;
  img?: string;
  text?: string;
} & ButtonBaseProps;

/**
 *
 *
 * @export
 * @class Button
 * @extends {ButtonBase<TProps>}
 * @template TProps
 */
export default class Button<
  TProps extends ButtonProps = ButtonProps
> extends ButtonBase<TProps> {
  /**
   *
   *
   * @protected
   * @returns {JSX.Element}
   * @memberof Button
   */
  protected renderChildren(): JSX.Element {
    // "<></>" syntax from here:
    // https://github.com/facebook/react/issues/2127#issuecomment-54196748
    return (
      <>
        {this.props.icon ? (
          <span className={this.props.icon} />
        ) : this.props.img ? (
          <img src={this.props.img} />
        ) : null}
        {this.props.text}
      </>
    );
  }
}

/**
 *
 *
 * @export
 * @class IconButton
 * @extends {(ButtonBase<ButtonProps & SealedComponent>)}
 */
export class IconButton extends Button<ButtonProps & SealedComponent> {}

/**
 *
 *
 * @export
 * @class OutlineButton
 * @extends {Button<ExcludeProps<ButtonProps, "outline">>}
 */
export class OutlineButton extends Button<
  ExcludeProps<ButtonProps, "outline">
> {
  render() {
    return <Button {...this.props} outline={true} />;
  }
}

/**
 *
 *
 * @export
 * @class RoundButton
 * @extends {Button<ExcludeProps<ButtonProps, "round">>}
 */
export class RoundButton extends Button<ExcludeProps<ButtonProps, "round">> {
  render() {
    return <Button {...this.props} round={true} />;
  }
}

/**
 *
 *
 * @export
 * @class SquareButton
 * @extends {(Button<ExcludeProps<ButtonProps, "text"> & SealedComponent>)}
 */
export class SquareButton extends Button<
  ExcludeProps<ButtonProps, "text"> & SealedComponent
> {
  /**
   *
   *
   * @protected
   * @type {string}
   * @memberof SquareButton
   */
  protected basicClass?: string = "button square";
}

/**
 *
 *
 * @export
 * @class CycleButton
 * @extends {(Button<ExcludeProps<ButtonProps, "text"> & SealedComponent>)}
 */
export class CycleButton extends Button<
  ExcludeProps<ButtonProps, "text"> & SealedComponent
> {
  /**
   *
   *
   * @protected
   * @type {string}
   * @memberof CycleButton
   */
  protected basicClasses: string = "button cycle";
}

/**
 *
 *
 * @export
 * @class ShadowButton
 * @extends {Button}
 */
export class ShadowButton extends Button {
  /**
   *
   *
   * @protected
   * @type {string}
   * @memberof ShadowButton
   */
  protected basicClasses: string = "button drop-shadow";
}

/**
 *
 *
 * @export
 * @class FlatButton
 * @extends {Button}
 */
export class FlatButton extends Button {
  /**
   *
   *
   * @protected
   * @type {string}
   * @memberof FlatButton
   */
  protected basicClasses: string = "button flat-button";
}

type CommandButtonProps = {
  caption: string;
  icon: string;
  iconPos?: "left" | "right";
} & ButtonProps;

/**
 *
 *
 * @export
 * @class CommandButton
 * @extends {Button<CommandButtonProps>}
 */
export class CommandButton extends Button<CommandButtonProps> {
  /**
   *
   *
   * @protected
   * @type {string}
   * @memberof CommandButton
   */
  protected basicClasses: string = "command-button";

  /**
   *
   *
   * @protected
   * @returns {JSX.Element}
   * @memberof CommandButton
   */
  protected renderChildren(): JSX.Element {
    return (
      <>
        {<span className={["icon", this.props.icon].join(" ")} />}
        {
          <span className="caption">
            {this.props.caption}
            <small>{this.props.text || this.props.children}</small>
          </span>
        }
      </>
    );
  }
}

type ImageButtonProps = ExcludeProps<ButtonProps, "img" | "text"> &
  SealedComponent & {
    caption: string;
    icon: string;
    iconPos?: "left" | "right";
  };

/**
 *
 *
 * @export
 * @class ImageButton
 * @extends {ButtonBase<ImageButtonProps>}
 */
export class ImageButton extends ButtonBase<ImageButtonProps> {
  /**
   *
   *
   * @protected
   * @type {string}
   * @memberof ImageButton
   */
  protected basicClasses: string = "image-button";

  /**
   *Creates an instance of ImageButton.
   * @param {ImageButtonProps} props
   * @memberof ImageButton
   */
  constructor(props: ImageButtonProps) {
    super(props);
    props.iconPos === "right" && (this.basicClasses += " icon-right");
  }

  /**
   *
   *
   * @protected
   * @returns {JSX.Element}
   * @memberof ImageButton
   */
  protected renderChildren(): JSX.Element {
    return (
      <>
        {<span className={["icon", this.props.icon || ""].join(" ")} />}
        {<span className="caption">{this.props.caption}</span>}
      </>
    );
  }
}

type ShortcutButtonProps = {
  caption?: string;
  icon?: string;
  img?: string;
  tag?: string;
} & ButtonBaseProps &
  SealedComponent;

/**
 *
 *
 * @export
 * @class Shortcut
 * @extends {ButtonBase<ShortcutButtonProps>}
 */
export class ShortcutButton extends ButtonBase<ShortcutButtonProps> {
  /**
   *
   *
   * @protected
   * @type {string}
   * @memberof Shortcut
   */
  protected basicClasses: string = "shortcut";

  /**
   *Creates an instance of Shortcut.
   * @param {ShortcutButtonProps} props
   * @memberof Shortcut
   */
  constructor(props: ShortcutButtonProps) {
    super(props);
    !props.caption && (this.basicClasses += " no-caption");
  }

  /**
   *
   *
   * @protected
   * @returns {JSX.Element}
   * @memberof Shortcut
   */
  protected renderChildren(): JSX.Element {
    return (
      <>
        {this.props.tag ? <span className="tag">{this.props.tag}</span> : null}
        {this.props.caption ? (
          <span className="caption">{this.props.caption}</span>
        ) : null}
        {this.props.icon ? (
          <span className={["icon", this.props.icon || ""].join(" ")} />
        ) : this.props.img ? (
          <img src={this.props.img} className="icon" />
        ) : null}
      </>
    );
  }
}

/**
 *
 *
 * @export
 * @class ToolButton
 * @extends {(ButtonBase<ButtonProps & SealedComponent>)}
 */
export class ToolButton extends ButtonBase<ButtonProps & SealedComponent> {
  /**
   *
   *
   * @protected
   * @type {string}
   * @memberof ToolButton
   */
  protected basicClasses: string = "tool-button";

  /**
   *
   *
   * @protected
   * @returns {JSX.Element}
   * @memberof ToolButton
   */
  protected renderChildren(): JSX.Element {
    return (
      <>
        {this.props.icon ? (
          <span className={this.props.icon} />
        ) : this.props.img ? (
          <img src={this.props.img} alt="" />
        ) : null}
        {this.props.text}
      </>
    );
  }
}

type DropdownButtonProps = {
  text: string;
  menus: Array<
    {
      text: string;
      icon?: string;
      img?: string;
    } & InlineStyle &
      SupportedReactEventHandlers<HTMLAnchorElement, "onClick">
  >;
} & ExcludeProps<ButtonProps, "onClick">;

type DropdownButtonStates = { active?: boolean };

export class DropdownButton<
  TProps extends DropdownButtonProps
> extends React.Component<TProps & DropdownButtonProps, DropdownButtonStates> {
  protected refRootEle: React.RefObject<HTMLDivElement>;
  protected refMenuContainer: React.RefObject<HTMLUListElement>;

  constructor(props: TProps) {
    super(props);
    this.refRootEle = React.createRef<HTMLDivElement>();
    this.refMenuContainer = React.createRef<HTMLUListElement>();
    this.state = { active: false };
  }

  protected handleClick(): void {
    if (this.state.active === false) {
      setTimeout(() => {
        const rect = this.refRootEle.current!.getBoundingClientRect();
        const bottom =
          document.documentElement!.clientHeight - rect.top - rect.height;
        const menuHeight = this.refMenuContainer.current!.clientHeight;

        // if (rect.top > bottom) {
        //   this.refMenuContainer.current!.style.top = `${-menuHeight}px`;
        //   return;
        // }

        if (rect.top < menuHeight) {
          this.refMenuContainer.current!.style.top = `initial`;
        } else {
          if (bottom < menuHeight) {
            this.refMenuContainer.current!.style.top = `${-menuHeight}px`;
          } else {
            this.refMenuContainer.current!.style.top = `initial`;
          }
        }
      }, 0);
      this.setState({ active: true });
    } else if (this.state.active === true) {
      this.setState({ active: false });
    }
  }

  protected renderMenuItem(
    menu: {
      text: string;
      icon?: string | undefined;
      img?: string | undefined;
    } & InlineStyle &
      SupportedReactEventHandlers<HTMLAnchorElement, "onClick">
  ): React.ReactNode {
    return (
      <a href="javascript:void(0);" onClick={menu.onClick}>
        {menu.icon ? (
          <span className={"icon " + menu.icon} />
        ) : menu.img ? (
          <img src={menu.img} alt="" />
        ) : null}
        {menu.text}
      </a>
    );
  }

  render() {
    return (
      <div
        ref={this.refRootEle}
        className={[
          "dropdown-button",
          this.props.size || "",
          this.state.active ? "active-container" : ""
        ].join(" ")}
        onClick={() => this.handleClick()}
      >
        <button
          className={[
            "button dropdown-toggle",
            this.props.class || "",
            this.props.size || "",
            this.state.active ? "active-toggle active-control" : ""
          ].join(" ")}
        >
          {this.props.text}
        </button>
        <ul
          ref={this.refMenuContainer}
          className="d-menu"
          data-role="dropdown"
          data-role-dropdown="true"
          style={{ display: this.state.active ? "block" : "none" }}
        >
          {this.props.menus.map(menu => (
            <li style={menu.style} key={Math.random()}>
              {this.renderMenuItem(menu)}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

type SplitDropdownButtonProps = DropdownButtonProps &
  SupportedReactEventHandlers<HTMLButtonElement, "onClick">;

/**
 *
 *
 * @export
 * @class SplitDropdownButton
 * @extends {DropdownButton}
 */
export class SplitDropdownButton extends DropdownButton<
  SplitDropdownButtonProps
> {
  render() {
    return (
      <div
        ref={this.refRootEle}
        className={["split-button", this.props.size || ""].join(" ")}
      >
        <button
          className={[
            "button",
            this.props.class || "",
            this.props.size || ""
          ].join(" ")}
          onClick={this.props.onClick}
        >
          {this.props.text}
        </button>
        <button
          className={[
            "button split dropdown-toggle",
            this.props.class || "",
            this.props.size || "",
            this.state.active ? "active-toggle active-control" : ""
          ].join(" ")}
          onClick={() => this.handleClick()}
        />
        <ul
          ref={this.refMenuContainer}
          className="d-menu"
          data-role="dropdown"
          data-role-dropdown="true"
          style={{ display: this.state.active ? "block" : "none" }}
        >
          {this.props.menus.map(menu => (
            <li
              style={menu.style}
              key={Math.random()}
              onClick={() => this.handleClick()}
            >
              {this.renderMenuItem(menu)}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

type InfoButtonProps = {
  icon?: string;
  img?: string;
  caption?: string;
  info: string;
  class?: string;
  round?: boolean;
  onClick?: (info: string, updateInfo: (newInfo: string) => void) => void;
} & InlineStyle;

/**
 *
 *
 * @export
 * @class InfoButton
 * @extends {React.Component<InfoButtonProps>}
 */
export class InfoButton extends React.Component<
  InfoButtonProps,
  { info: string }
> {
  public get info(): string {
    return this.state.info;
  }

  public set info(value: string) {
    this.setState({ info: value });
  }

  constructor(props: InfoButtonProps) {
    super(props);
    this.state = { info: props.info };
  }

  render() {
    return (
      <div
        style={this.props.style}
        className={[
          "info-button",
          this.props.class || "",
          this.props.round ? "rounded" : ""
        ].join(" ")}
      >
        <a
          href="javascript:void(0);"
          className="button"
          onClick={() => {
            this.props.onClick &&
              this.props.onClick(this.info, (value: string) => {
                this.info = value;
              });
          }}
        >
          {this.props.icon ? (
            <span className={this.props.icon} />
          ) : this.props.img ? (
            <img src={this.props.img} alt="" />
          ) : null}
          {this.props.caption}
        </a>
        <a href="javascript:void(0);" className="info">
          {this.state.info}
        </a>
      </div>
    );
  }
}
