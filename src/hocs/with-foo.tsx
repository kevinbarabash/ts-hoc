export type WithFoo = {
  foo: string;
};

export function withFoo<T extends WithFoo = WithFoo>(
  WrappedComponent: React.ComponentType<T>
) {
  // Try to create a nice displayName for React Dev Tools.
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithFoo = (props: Omit<T, keyof WithFoo>) => {
    return <WrappedComponent {...(props as T)} foo="foo" />;
  };

  ComponentWithFoo.displayName = `withFoo(${displayName})`;

  return ComponentWithFoo;
}
