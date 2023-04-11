import * as React from "react";

import { withFoo, WithFooProps, WithoutFoo } from "./with-foo";
import { withBar, WithBarProps, WithoutBar } from "./with-bar";

type Props = {
  baz: boolean;
  qux: string;
} & WithFooProps &
  WithBarProps;

type DefaultProps = {
  qux: Props["qux"];
}

class InternalComponent extends React.Component<Props> {
  static defaultProps: DefaultProps = {
    qux: "hello",
  };

  render() {
    return (
      <div>
        foo: {this.props.foo}
        bar: {this.props.bar}
        baz: {this.props.baz}
        qux: {this.props.qux}
      </div>
    );
  }
}

InternalComponent.defaultProps.qux

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
      <Component baz={true} qux="bonjour" />
      <Component baz={true} extraProp="oof" />
      <Component /> {/* missing prop */}
    </div>
  );
};
