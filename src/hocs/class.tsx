import * as React from "react";

import { withFoo, WithFooProps } from "./with-foo";
import { withBar, WithBarProps } from "./with-bar";

type Props = {
    baz: boolean,
    qux?: string,
} & WithFooProps & WithBarProps & typeof InternalComponent.defaultProps;

class InternalComponent extends React.Component<Props> {
    static defaultProps = {
        qux: "hello",
    }

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
        <Component baz={true} qux="bonjour" />
        <Component baz={true} extraProp="oof" />
        <Component /> {/* missing prop */}
    </div>
}
