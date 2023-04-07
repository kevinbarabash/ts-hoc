export type WithBarProps = {
  bar: number;
};

export function withBar<
  C extends React.JSXElementConstructor<
    React.ComponentProps<C> & WithBarProps
  > & { displayName?: string | undefined }
>(WrappedComponent: C) {
  type OuterProps = Omit<
    JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>,
    keyof WithBarProps
  >;

  // Try to create a nice displayName for React Dev Tools.
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithFoo = (props: OuterProps) => {
    return <WrappedComponent {...(props as any)} bar={5} />;
  };

  ComponentWithFoo.displayName = `withFoo(${displayName})`;

  return ComponentWithFoo;
}
