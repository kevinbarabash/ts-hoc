export type WithBar = {
  bar: number;
};

export function withBar<
  C extends React.JSXElementConstructor<React.ComponentProps<C> & WithBar>
>(WrappedComponent: C) {
  type InnerProps = JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>;
  type OuterProps = Omit<InnerProps, keyof WithBar>;

  // Try to create a nice displayName for React Dev Tools.
  const displayName = WrappedComponent.name || "Component";

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithFoo = (props: OuterProps) => {
    return <WrappedComponent {...(props as any)} bar={5} />;
  };

  ComponentWithFoo.displayName = `withFoo(${displayName})`;

  return ComponentWithFoo;
}
