/**
 * We're going back to the "function-as-children" pattern.
 * 
 * The reason for this is that it's easier to get default props and refs working 
 * correctly using this pattern.  We are still injecting props like an HOC would 
 * be though by creating wrappers around the components that we're inject the
 * props into.  See class.tsx and functional.tsx for examples.
 * 
 * This pattern is also more flexible than traditional HOCs because we can rename
 * props before injecting them into the component being wrapped.  This would allow
 * a component to use multiple feature flags without having to transition to hooks.
 */
import * as React from "react";

export type WithFooProps = {
  foo: string;
};

// Helper type so that all of the children functions look the same.
type Children<InjectedProps> = {
  children: (injectedProps: InjectedProps) => React.ReactElement
};

// FAC component that's curried to allow customization
export const WithFoo = (foo: string) => 
  ({children}: Children<WithFooProps>) => children({foo});

export const WithFooBar = WithFoo("bar");

export type WithBazProps = {
  baz: number;
};

export const WithBaz = ({children}: Children<WithBazProps>) => children({baz: 42});

export const useBaz = () => React.useMemo(() => 42, []);
export const useFoo = (foo: string) => React.useMemo(() => foo, [foo]);
