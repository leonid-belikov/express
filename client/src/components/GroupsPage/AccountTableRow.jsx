import React, {Component} from "react";
import {IconButton, Table} from "evergreen-ui";


class AccountTableRow extends Component {

    handleRemoveBtnClick() {
        this.props.handleRemoveRow(this.props.name);
    }

    render() {
        return (
            <Table.Row key={this.props.name}>
                <Table.TextCell>
                    {this.props.name}
                </Table.TextCell>
                <Table.Cell paddingRight={0} flexBasis={50} flexShrink={0} flexGrow={0}>
                    <IconButton
                        appearance="minimal"
                        icon='trash'
                        onClick={this.handleRemoveBtnClick.bind(this)}/>
                </Table.Cell>
            </Table.Row>
        );
    }
}

export default AccountTableRow;
