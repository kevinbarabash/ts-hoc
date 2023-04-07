import * as React from "react";

import { withFoo, WithFooProps } from "./with-foo";
import { withBar, WithBarProps } from "./with-bar";

type Props = {
    baz: boolean,
    qux?: string,
} & WithFooProps & WithBarProps;

const InternalComponent = ({foo, bar, baz, qux = "hello"}: Props) => {
    return <div>
        foo: {foo}
        bar: {bar}
        baz: {baz}  
        qux: {qux}   
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
