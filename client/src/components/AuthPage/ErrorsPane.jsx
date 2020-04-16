import React, {Component} from "react";
import {Pane} from "evergreen-ui";


class ErrorsPane extends Component {

    render() {
        return (
            <Pane
                width='100%'
                marginBottom={15}
                display='flex'
                justifyContent='space-between'>
                <Pane
                    width={this.props.colWidth}>
                    {this.props.leftColContent}
                </Pane>
                <Pane
                    width={this.props.colWidth}>
                    {this.props.rightColContent}
                </Pane>
            </Pane>
        )
    }
}

export default ErrorsPane;
