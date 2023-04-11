import * as React from "react";

import { withFoo, WithFooProps, WithoutFoo } from "./with-foo";
import { withBar, WithBarProps, WithoutBar } from "./with-bar";

type Props = {
  baz: boolean;
  qux?: string;
} & WithFooProps &
  WithBarProps;

const InternalComponent = ({ foo, bar, baz, qux = "hello" }: Props) => {
  return (
    <div>
      foo: {foo}
      bar: {bar}
      baz: {baz}
      qux: {qux}
    </div>
  );
};

type ExportProps = WithoutFoo<
  WithoutBar<
    JSX.LibraryManagedAttributes<
      typeof InternalComponent,
      React.ComponentProps<typeof InternalComponent>
    >
  >
>;

const Component = withFoo(
  withBar(InternalComponent)
) as React.ComponentType<ExportProps>;

const Consumer = () => {
  return (
    <div>
      <Component baz={true} />
      <Component baz={true} qux="hello" />
      <Component baz={true} extraProp="oof" />
      <Component /> {/* missing prop */}
    </div>
  );
};
