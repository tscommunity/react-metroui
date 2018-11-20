import "../../assets/styles/less/pagination.less";
import * as React from "react";

type PaginatorProps = {
  size?: "small" | "large";
  pageSize: number;
  pageSizeList?: number[];
  compactMode?: boolean;
  noGap?: boolean;
  toFirstText?: string;
  toPreviousText?: string;
  toNextText?: string;
  toLastText?: string;
  gotoText?: string;
  alignment?: "left" | "center" | "right";
  onInit: (pageSize: number, update: (total: number) => void) => void;
  onPaginate: (
    pageSize: number,
    pageIndex: number,
    onFinish: (pageSize: number, total: number) => void
  ) => void;
} & CommonProps;

type PaginatorStates = {
  total: number;
  pageSize: number;
  totalPages: number;
  pagesMaxLenght: number;
  pageIndex: number;
};

export default class Paginator extends React.Component<
  PaginatorProps,
  PaginatorStates
> {
  public static defaultProps = {
    pageSize: 50,
    pageSizeList: [10, 30, 50, 100, 300, 500],
    compactMode: true,
    noGap: false,
    toFirstText: "First",
    toPreviousText: "Pre",
    toNextText: "Next",
    toLastText: "Last",
    gotoText: "Goto Page",
    alignment: "center"
  };

  constructor(props: PaginatorProps) {
    super(props);
    this.state = {
      total: 0,
      pageSize: this.props.pageSize || 50,
      pagesMaxLenght: 1,
      totalPages: 0,
      pageIndex: 1
    };
  }

  /**
   *
   *
   * @private
   * @returns {string}
   * @memberof Paginator
   */
  private getClasses(): string {
    const classes: string[] = ["pagination"];
    classes.push(`flex-justify-${this.props.alignment || "center"}`);
    if (this.props.class) {
      classes.push(this.props.class);
    }
    if (this.props.size) {
      classes.push(`size-${this.props.size}`);
    }
    if (this.props.noGap) {
      classes.push("no-gap");
    }

    return classes.join(" ");
  }

  componentDidMount() {
    this.props.onInit(this.state.pageSize, total => {
      let totalPages = Math.ceil(total / this.state.pageSize);
      this.setState({
        total: total,
        totalPages: totalPages,
        pagesMaxLenght: totalPages.toString().length
      });
    });
  }

  /**
   *
   *
   * @private
   * @param {number} pageSize
   * @param {number} total
   * @memberof Paginator
   */
  private update(pageSize: number, total: number) {
    console.log(pageSize, total);
  }

  protected get totalPage(): number {
    return Math.ceil(this.state.total / this.state.pageSize);
  }

  /**
   *
   *
   * @private
   * @param {number} pageIndex
   * @memberof Paginator
   */
  private handlePaginate(pageIndex: number) {
    this.props.onPaginate(this.state.pageSize, pageIndex, (pageSize, total) => {
      this.update(pageSize, total);
    });
  }

  private gotoPage(index: number): void {
    this.setState({ pageIndex: index });
    this.handlePaginate(index);
  }

  private handleGotoPage(evt: React.KeyboardEvent<HTMLInputElement>) {
    let page = evt.currentTarget.value;

    if (
      evt.keyCode === 8 /* backspace */ ||
      // evt.keyCode === 13 /* enter */ ||
      evt.keyCode === 17 /* conctrol */ ||
      evt.keyCode === 35 /* end */ ||
      evt.keyCode === 36 /* home */ ||
      evt.keyCode === 37 /* left */ ||
      evt.keyCode === 39 /* right */ ||
      evt.keyCode === 46 /* delete */ ||
      evt.keyCode === 65 /* a/A */
    ) {
      return;
    }

    if ((evt.keyCode !== 13 && evt.keyCode < 48) || evt.keyCode > 57) {
      evt.preventDefault();
      return;
    } else {
      if (evt.keyCode === 13) {
        if (page === "") {
          evt.stopPropagation();
          evt.preventDefault();
          return;
        }

        console.log(page, "enter key pressed.");
        this.gotoPage(Number(page));
      } else {
        const pos = evt.currentTarget.selectionStart;
        page = pos! === 0 ? evt.key + page : page + evt.key;

        if (/^[1-9][0-9]*$/g.test(page)) {
          if (Number(page) > this.state.totalPages) {
            evt.preventDefault();
            return;
          }
        } else {
          evt.preventDefault();
          return false;
        }
      }
    }
  }

  render() {
    if (this.props.compactMode) {
      return (
        <ul className={this.getClasses()}>
          <li className="page-item">
            <a href="javascript:void(0);" className="page-link">
              {this.props.toFirstText}
            </a>
          </li>
          <li className="page-item">
            <a href="javascript:void(0);" className="page-link">
              {this.props.toPreviousText}
            </a>
          </li>
          <li className="page-box" style={{ width: "auto" }}>
            {/* <label htmlFor="">{this.props.gotoText}</label> */}
            <input
              type="text"
              maxLength={this.state.pagesMaxLenght}
              style={{
                width: this.state.pagesMaxLenght + 1 + "em"
              }}
              onKeyDown={evt => this.handleGotoPage(evt)}
            />
            <span>{this.state.pageIndex}</span>
            <span>/</span>
            <span>{this.state.totalPages}</span>
          </li>
          <li className="page-item">
            <a href="javascript:void(0);" className="page-link">
              {this.props.toNextText}
            </a>
          </li>
          <li className="page-item">
            <a href="javascript:void(0);" className="page-link">
              {this.props.toLastText}
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className={this.getClasses()}>
          <li className="page-item">
            <a
              href="javascript:void(0);"
              className="page-link"
              onClick={() => {
                this.handlePaginate(1);
              }}
            >
              1
            </a>
          </li>
          <li className="page-item">
            <a href="javascript:void(0);" className="page-link">
              2
            </a>
          </li>
          <li className="page-item">
            <a href="javascript:void(0);" className="page-link">
              3
            </a>
          </li>
          <li className="page-item">
            <a href="javascript:void(0);" className="page-link">
              4
            </a>
          </li>
          <li className="page-item">
            <a href="javascript:void(0);" className="page-link">
              5
            </a>
          </li>
          <li className="page-item">
            <a href="javascript:void(0);" className="page-link">
              6
            </a>
          </li>
        </ul>
      );
    }
  }
}
