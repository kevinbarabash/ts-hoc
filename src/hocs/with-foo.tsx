export type WithFoo = {
  foo: string;
};

export function withFoo<
  C extends React.JSXElementConstructor<React.ComponentProps<C> & WithFoo>
>(
  WrappedComponent: C
) {
  type InnerProps = JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>;
  type OuterProps = Omit<InnerProps, keyof WithFoo>;

  // Try to create a nice displayName for React Dev Tools.
  const displayName = WrappedComponent.name || "Component";

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithFoo = (props: OuterProps) => {
    return <WrappedComponent {...(props as any)} foo="foo" />;
  };

  ComponentWithFoo.displayName = `withFoo(${displayName})`;

  return ComponentWithFoo;
}
