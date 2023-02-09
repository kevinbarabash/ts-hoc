import * as React from "react";

import { withFoo, withFooBar } from "./index";
import type { WithFooProps } from "./index";

type Props = WithFooProps & { name: string; greeting?: string };

const MyComponent: React.FC<Props> = ({ greeting = "world", name}) => {
  return (
    <h1>
      {greeting}: {name}
    </h1>
  );
};

const MyFooBarComponent = withFooBar(MyComponent);

const MyFooComponent = withFoo("baz")(MyComponent);

const MyApp: React.FC<{}> = () => {
  return (
    <div>
      <MyComponent foo="" greeting="hello" name="world" />
      <MyComponent foo="" name="world" />
      <MyFooBarComponent greeting="hello" name="world" />
      <MyFooBarComponent name="world" />
      <MyFooComponent greeting="hello" name="world" />
      <MyFooComponent name="world" />
    </div>
  );
};

// NOTE: This pattern of defining components doesn't work with HOCs.
const MyOtherComponent = ({ greeting = "world", name}: Props): React.ReactNode => {
  return (
    <h1>
      {greeting}: {name}
    </h1>
  );
};

const MyOtherFooBarComponent = withFooBar(MyOtherComponent);
