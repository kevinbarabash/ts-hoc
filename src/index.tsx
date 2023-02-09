import * as React from "react";

export type WithFooProps = {
  foo: string;
};

export function withFooBar<T extends WithFooProps = WithFooProps>(
  WrappedComponent: React.ComponentType<T>
) {
  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithFooBar = React.forwardRef((props: Omit<T, keyof WithFooProps>, ref) => {
    const foo = "bar";

    // Props comes afterwards so the can override the default ones.
    return <WrappedComponent {...(props as T)} foo={foo} ref={ref} />;
  });

  // Set the display name of the wrapper to something nice
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
    ComponentWithFooBar.displayName = `withFooBar(${displayName})`;

  return ComponentWithFooBar;
}

export function withFoo(option: string) {
  return function<T extends WithFooProps = WithFooProps>(
    WrappedComponent: React.ComponentType<T>
  ) {
    // Creating the inner component. The calculated Props type here is the where the magic happens.
    const ComponentWithFooBar = React.forwardRef((props: Omit<T, keyof WithFooProps>, ref) => {
      const foo = "bar";
  
      // Props comes afterwards so the can override the default ones.
      return <WrappedComponent {...(props as T)} foo={foo} ref={ref} />;
    });
  
    // Set the display name of the wrapper to something nice
    const displayName =
      WrappedComponent.displayName || WrappedComponent.name || "Component";
      ComponentWithFooBar.displayName = `withFooBar(${displayName})`;
  
    return ComponentWithFooBar;
  };
}
