import React, {Component} from "react";
import {Button, Icon} from "evergreen-ui";


class CardToolbarBtn extends Component {

    render() {
        return (
            <Button
                appearance='minimal'
                position='absolute'
                top={this.props.top}
                right={this.props.right}
                padding={10}
                data-id={this.props.cat_id}
                onClick={this.props.handleClick}>
                    <Icon
                        icon={this.props.icon}
                        size={12}
                        color='disabled'/>
            </Button>
        )
    }

}

export default CardToolbarBtn;
