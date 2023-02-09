import * as React from "react";

import {withFoo, withFooBar} from "./index";
import type {WithFooProps} from "./index";

type Props = WithFooProps & {name: string, greeting: string};

const MyComponent: React.FC<Props> = (props) => {
    const {greeting, name} = props;
    return <h1>{greeting}: {name}</h1>
}

const MyFooBarComponent = withFooBar(MyComponent);

const MyFooComponent = withFoo("baz")(MyComponent);

const MyApp: React.FC<{}> = () => {
    return <div>
        <MyComponent foo="" greeting="hello" name="world" />
        <MyFooBarComponent greeting="hello" name="world" />
        <MyFooComponent greeting="hello" name="world" />
    </div>;
}
