import React, {Component} from "react";
import {connect} from "react-redux";
import {Card, Icon, IconButton, Text, toaster} from "evergreen-ui";

import {removeUser} from "../../redux/actions/groupActions";


class UserCard extends Component {

    handleDeleteBtnClick() {
        const user = this.props.user;
        this.props.removeUser(user);
        toaster.notify(`Пользователь ${user} исключен из списка приглашенных`);
    }

    render() {
        return (
            <Card
                position='relative'
                display='flex'
                flexDirection='column'
                alignItems='center'
                elevation={3}
                paddingY={15}
                paddingX={30}
                marginRight={20}
                marginBottom={20}
                background='greenTint'>
                <Text>
                    <Icon icon='person' size={40}/>
                </Text>
                <Text>
                    {this.props.user}
                </Text>
                <IconButton
                    position='absolute'
                    top={4}
                    right={4}
                    height={24}
                    icon='cross'
                    appearance='minimal'
                    onClick={this.handleDeleteBtnClick.bind(this)}
                />
            </Card>
        )
    }
}

export default connect(
    null,
    dispatch => ({
        removeUser: user => dispatch(removeUser(user))
    })
)(UserCard);
