export type WithFooProps = {
  foo: string;
};

export type WithoutFoo<T> = Omit<T, keyof WithFooProps>;

export function withFoo<
  C extends React.ComponentType<React.ComponentProps<C> & WithFooProps> & {
    displayName?: string | undefined;
  }
>(WrappedComponent: C) {
  type OuterProps = Omit<
    JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>,
    keyof WithFooProps
  >;

  // Try to create a nice displayName for React Dev Tools.
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithFoo = (props: OuterProps) => {
    return <WrappedComponent {...(props as any)} foo="foo" />;
  };

  ComponentWithFoo.displayName = `withFoo(${displayName})`;

  return ComponentWithFoo;
}
