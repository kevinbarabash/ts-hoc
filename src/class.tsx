import * as React from "react";

import { withFoo, withFooBar } from "./hoc";
import type { WithFooProps } from "./hoc";

type Props = typeof MyComponent.defaultProps & WithFooProps & { name: string; greeting?: string };

class MyComponent extends React.Component<Props> {
  static defaultProps = {
    greeting: "hello"
  }

  render() {
    const {greeting, name} = this.props;

    return <h1>
      {greeting}: {name}
    </h1>;
  }
}

const MyFooBarComponent = withFooBar(MyComponent);

const MyFooComponent = withFoo("baz")(MyComponent);

const MyApp: React.FC<{}> = () => {
  return (
    <div>
      <MyComponent foo="" greeting="hello" name="world" />
      <MyComponent foo="" bad="bad" name="world" />
      <MyFooBarComponent greeting="hello" name="world" />
      <MyFooBarComponent bad="bad" name="world" />
      <MyFooComponent greeting="hello" name="world" />
      <MyFooComponent bad="bad" name="world" />
    </div>
  );
};
