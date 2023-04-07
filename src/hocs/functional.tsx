import * as React from "react";

import { withFoo, WithFooProps } from "./with-foo";
import { withBar, WithBarProps } from "./with-bar";

type Props = {
    baz: boolean,
    qux?: string,
} & WithFooProps & WithBarProps;

const InternalComponent = (props: Props) => {
    return <div>
        foo: {props.foo}
        bar: {props.bar}
        baz: {props.baz}  
        {props.qux ? `qux: ${props.qux}` : null}    
    </div>
}

const Component = withFoo(withBar(InternalComponent));

const Consumer = () => {
    return <div>
        <Component baz={true} />
        <Component baz={true} qux="hello" />
        <Component baz={true} extraProp="oof" />
        <Component /> {/* missing prop */}
    </div>
}
