import * as React from "react";

import { withFoo, WithFoo } from "./with-foo";
import { withBar, WithBar } from "./with-bar";

type Props = {
    baz: boolean,
    qux?: string,
} & WithFoo & WithBar;

class InternalComponent extends React.Component<Props> {
    render() {
        return <div>
            foo: {this.props.foo}
            bar: {this.props.bar}
            baz: {this.props.baz}  
            {this.props.qux ? `qux: ${this.props.qux}` : null}  
        </div>
    }
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
