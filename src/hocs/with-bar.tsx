export type WithBar = {
  bar: number;
};

export function withBar<T extends WithBar = WithBar>(
  WrappedComponent: React.ComponentType<T>
) {
  // Try to create a nice displayName for React Dev Tools.
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithFoo = (props: Omit<T, keyof WithBar>) => {
    return <WrappedComponent {...(props as T)} bar={5} />;
  };

  ComponentWithFoo.displayName = `withFoo(${displayName})`;

  return ComponentWithFoo;
}
