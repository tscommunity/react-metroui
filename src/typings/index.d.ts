type NonNullablePick<T, K extends keyof T> = { [P in K]: NonNullable<T[P]> };

type SupportedEventHandlers<
  THandlers extends keyof GlobalEventHandlers
> = Partial<NonNullablePick<GlobalEventHandlers, THandlers>>;

type RequiredEventHandlers<
  THandlers extends keyof GlobalEventHandlers
> = Required<SupportedEventHandlers<THandlers>>;

type SupportedReactEventHandlers<
  TDOMElement extends HTMLElement,
  THandlers extends keyof React.DOMAttributes<TDOMElement>
> = NonNullablePick<React.DOMAttributes<TDOMElement>, THandlers>;

type RequiredReactEventHandlers<
  TDOMElement extends HTMLElement,
  THandlers extends keyof React.DOMAttributes<TDOMElement>
> = Required<SupportedReactEventHandlers<TDOMElement, THandlers>>;

type SupportedHTMLAttributes<
  TElement extends HTMLElement,
  TAttributes extends keyof React.HTMLAttributes<TElement>
> = NonNullablePick<React.HTMLAttributes<TElement>, TAttributes>;

type RequiredHTMLAttributes<
  TElement extends HTMLElement,
  TAttributes extends keyof React.HTMLAttributes<TElement>
> = Required<SupportedHTMLAttributes<TElement, TAttributes>>;

type AddChildrenProp<TProps> = TProps & { children?: React.ReactNode };

type RestrictChildrenOf<T> = React.ReactElement<T>[] | React.ReactElement<T>;

// type RestrictChildrenOf<T> = React.DetailedHTMLProps<React.HTMLAttributes<T>,T>;

type ExcludeProps<TObj, TProps extends keyof TObj> = Pick<
  TObj,
  Exclude<keyof TObj, TProps>
>;

type InlineStyle = {
  style?: React.CSSProperties;
};

// type Union<T1, T2> = T1 | T2;

// type MutuallyExclusive<
//   TProps,
//   Props1 extends keyof TProps,
//   Props2 extends keyof TProps
// > = Union<
//   Pick<TProps, Exclude<keyof TProps, Props1>>,
//   Pick<TProps, Exclude<keyof TProps, Props2>>
// >;

/**
 * Make the component sealed so that no child component can be placed in it.
 *
 * @interface SealedComponent
 */
interface SealedComponent {
  children?: never | never[];
}

/**
 * Make the component sealed so that no child component can be placed in it.
 *
 * @alias MakeSealed
 * @template TProps
 */
type MakeSealed<TProps> = TProps & SealedComponent;
