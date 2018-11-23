import * as React from "react";
import Select from "../form/Selects";

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
  onInit: (pageSize: number, initedCallback: (total: number) => void) => void;
  onPageIndexChange: (
    pageSize: number,
    pageIndex: number,
    pageIndexChangedCallback: (pageSize: number, total: number) => void
  ) => void;
  onPageSizeChange: (
    pageSize: number,
    pageIndex: number,
    pageSizeChangedCallback: (total: number, pageIndex: number) => void
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
  private get rootClasses(): string {
    const classes: string[] = ["pagination"];
    classes.push(`flex-justify-${this.props.alignment || "center"}`);
    this.props.size && classes.push(`size-${this.props.size}`);
    this.props.noGap && classes.push("no-gap");
    this.props.outline === true && classes.push("outline");
    this.props.round === true && classes.push("rounded");
    this.props.class && classes.push(this.props.class);

    return classes.join(" ");
  }

  /**
   *
   *
   * @readonly
   * @private
   * @type {string}
   * @memberof Paginator
   */
  private get backwardPageButtonClasses(): string {
    const classes: string[] = ["page-item"];
    if (this.state.pageIndex === 1) {
      classes.push("disabled");
    }
    return classes.join(" ");
  }

  /**
   *
   *
   * @readonly
   * @private
   * @type {string}
   * @memberof Paginator
   */
  private get forwardPageButtonClasses(): string {
    const classes: string[] = ["page-item"];
    if (this.state.pageIndex === this.state.totalPages) {
      classes.push("disabled");
    }
    return classes.join(" ");
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
    this.props.onPageIndexChange(
      this.state.pageSize,
      pageIndex,
      (pageSize, total) => {
        this.update(pageSize, total);
      }
    );
  }

  private gotoPage(index: number): void {
    this.setState({ pageIndex: index });
    this.handlePaginate(index);
  }

  private handlePageIndexChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const value = evt.target.value;
    const ele = evt.target;
    setTimeout(() => {
      ele.value = value;
    }, 0);
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
      ((evt.keyCode === 65 /* a/A */ || evt.keyCode === 88) /* x/X */ &&
        evt.ctrlKey)
    ) {
      return;
    }

    if ((evt.keyCode !== 13 && evt.keyCode < 48) || evt.keyCode > 57) {
      evt.preventDefault();
      return;
    }

    if (evt.keyCode === 13) {
      if (page === "") {
        evt.preventDefault();
        return;
      }

      // invokes the goto page method.
      this.gotoPage(Number(page));
    } else {
      const start = evt.currentTarget.selectionStart;
      const end = evt.currentTarget.selectionEnd;

      if (end !== start) {
        page = [page.substr(0, start!), evt.key, page.substr(end!)].join("");
      } else {
        page = [page.substr(0, start!), evt.key, page.substr(start!)].join("");
      }

      if (/^[1-9][0-9]*$/g.test(page)) {
        if (Number(page) > this.state.totalPages) {
          evt.preventDefault();
          return;
        }

        const target = evt.currentTarget;
        setTimeout(() => {
          target.value = page;
        }, 0);
      } else {
        evt.preventDefault();
        return;
      }
    }
  }

  private gotoFirstPage() {
    if (this.state.pageIndex > 1) {
      this.setState(() => {
        return { pageIndex: 1 };
      });

      this.handlePaginate(1);
    }
  }

  private gotoPrePage() {
    if (this.state.pageIndex > 1) {
      this.setState(preState => {
        const pageIndex = preState.pageIndex - 1;
        setTimeout(() => {
          this.handlePaginate(pageIndex);
        }, 0);
        return { pageIndex: pageIndex };
      });
    }
  }

  private gotoNextPage() {
    if (this.state.pageIndex < this.state.totalPages) {
      this.setState(preState => {
        const pageIndex = preState.pageIndex + 1;
        setTimeout(() => {
          this.handlePaginate(pageIndex);
        }, 0);
        return { pageIndex: pageIndex };
      });
    }
  }

  private gotoLastPage() {
    if (this.state.pageIndex < this.state.totalPages) {
      this.setState(preState => {
        return { pageIndex: preState.totalPages };
      });

      this.handlePaginate(this.state.totalPages);
    }
  }

  componentDidMount() {
    this.props.onInit(this.state.pageSize, total => {
      const totalPages = Math.ceil(total / this.state.pageSize);

      this.setState({
        total: total,
        totalPages: totalPages,
        pagesMaxLenght: totalPages.toString().length
      });
    });
  }

  render() {
    if (this.props.compactMode) {
      return (
        <>
          <Select
            options={this.props.pageSizeList!.map(item => {
              return { text: item.toString(), value: item.toString() };
            })}
            filterable={true}
          />
          <ul className={this.rootClasses}>
            <li className={this.backwardPageButtonClasses}>
              <a
                href="javascript:void(0);"
                className="page-link"
                onClick={() => this.gotoFirstPage()}
              >
                {this.props.toFirstText}
              </a>
            </li>
            <li className={this.backwardPageButtonClasses}>
              <a
                href="javascript:void(0);"
                className="page-link"
                onClick={() => this.gotoPrePage()}
              >
                {this.props.toPreviousText}
              </a>
            </li>
            <li className="page-box" style={{ width: "auto" }}>
              <input
                type="text"
                maxLength={this.state.pagesMaxLenght}
                style={{
                  width: this.state.pagesMaxLenght + 1 + "em"
                }}
                value={this.state.pageIndex}
                onChange={evt => this.handlePageIndexChange(evt)}
                onKeyDown={evt => this.handleGotoPage(evt)}
              />
              <span>{this.state.pageIndex}</span>
              <span>/</span>
              <span>{this.state.totalPages}</span>
            </li>
            <li className={this.forwardPageButtonClasses}>
              <a
                href="javascript:void(0);"
                className="page-link"
                onClick={() => this.gotoNextPage()}
              >
                {this.props.toNextText}
              </a>
            </li>
            <li className={this.forwardPageButtonClasses}>
              <a
                href="javascript:void(0);"
                className="page-link"
                onClick={() => this.gotoLastPage()}
              >
                {this.props.toLastText}
              </a>
            </li>
          </ul>
        </>
      );
    } else {
      return (
        <ul className={this.rootClasses}>
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
