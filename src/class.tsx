import * as React from "react";

import { WithFoo, WithFooBar, WithBaz, useFoo, useBaz } from "./hoc";
import type { WithFooProps, WithBazProps } from "./hoc";

type PublicProps = { name: string; greeting?: string };
type Props = typeof MyComponent.defaultProps & WithFooProps & PublicProps;

class MyComponent extends React.Component<Props> {
  static defaultProps = {
    greeting: "hello"
  }

  render(): React.ReactElement {
    const {greeting, name, foo} = this.props;

    return (
      <>
        <h1>
          {foo}
        </h1>
        <h2>
          {greeting}: {name}
        </h2>
      </>
    );
  }
}

const MyFooBarComponent = React.forwardRef<MyComponent, PublicProps>((props, ref) => {
  return <WithFooBar>
    {(fooBarProps) => <MyComponent {...props} {...fooBarProps} ref={ref} />}
  </WithFooBar>
})

const MyFooComponent = React.forwardRef<MyComponent, PublicProps>((props, ref) => {
  const WithFooBar = WithFoo("bar");

  return <WithFooBar>
    {({foo}) => <MyComponent {...props} foo={foo} ref={ref} />}
  </WithFooBar>
})

const MyApp: React.FC<{}> = () => {
  const ref = React.createRef<MyComponent>();
  return (
    <div>
      <MyComponent foo="" greeting="hello" name="world" />
      <MyComponent foo="" name="world" />
      <MyComponent foo="" name="world" ref={ref} />
      <MyComponent foo="" bad="bad" name="world" />
      <MyFooBarComponent greeting="hello" name="world" />
      <MyFooBarComponent name="world" />
      <MyFooBarComponent name="world" ref={ref} />
      <MyFooBarComponent bad="bad" name="world" />
      <MyFooComponent greeting="hello" name="world" />
      <MyFooComponent name="world" />
      <MyFooComponent name="world" ref={ref} />
      <MyFooComponent bad="bad" name="world" />
    </div>
  );
};


type MegaProps = WithBazProps & WithFooProps & PublicProps;

class MyMegaComponent extends React.Component<MegaProps> {
  static defaultProps = {
    greeting: "hello"
  }

  render(): React.ReactElement {
    const {greeting, name, foo} = this.props;

    return (
      <>
        <h1>
          {foo}
        </h1>
        <h2>
          {greeting}: {name}
        </h2>
      </>
    );
  }
}

const HookAndFAC = React.forwardRef<MyMegaComponent, PublicProps>(
  (props, ref) => {
    const foo = useFoo("bar");

    return (
      <WithBaz>
        {(bazProps) => <MyMegaComponent {...props} {...bazProps} foo={foo} ref={ref} />}
      </WithBaz>
    );
  }
);

const HookOnly = React.forwardRef<MyMegaComponent, PublicProps>(
  (props, ref) => {
    const foo = useFoo("bar");
    const baz = useBaz();

    return <MyMegaComponent {...props} baz={baz} foo={foo} ref={ref} />;
  }
);

const MyMegaApp: React.FC<{}> = () => {
  const ref = React.createRef<MyMegaComponent>();

  return (
    <div>
      <MyMegaComponent foo="" baz={0} greeting="hello" name="world" />
      <MyMegaComponent foo="" baz={0} name="world" />
      <MyMegaComponent foo="" baz={0} name="world" ref={ref} />
      <MyMegaComponent foo="" baz={0} bad="bad" name="world" />
      <HookAndFAC greeting="hello" name="world" />
      <HookAndFAC name="world" />
      <HookAndFAC name="world" ref={ref} />
      <HookAndFAC bad="bad" name="world" />
      <HookOnly greeting="hello" name="world" />
      <HookOnly name="world" />
      <HookOnly name="world" ref={ref} />
      <HookOnly bad="bad" name="world" />
    </div>
  );
};
