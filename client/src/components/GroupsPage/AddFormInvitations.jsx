import React, {Component} from "react";
import {Pane, TextInput, IconButton, toaster, Icon, Paragraph, Heading} from "evergreen-ui";
import './GroupsPage.css'
import {connect} from "react-redux";
import {findUser} from "../../redux/actions/groupActions";
import UserCard from "./UserCard";


class AddFormInvitations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    handleChangeInput(e) {
        const name = e.target.value;
        this.setState({
            ...this.state,
            name
        })
    }

    handleFindBtnClick() {
        const name = this.state.name;
        if (this.props.users.map(user => user.name).includes(name)) {
            toaster.notify(`Пользователь "${name}" уже в списке приглашенных`, {
                id: 'user-already-added'
            });
            return;
        }
        this.props.findUser(name);
    }

    getUsersList() {
        const userCards = this.props.users.map(user => <UserCard key={user.id} user={user.name}/>)
        return <Pane
            display='flex'
            flexWrap='wrap'
            overflowY='auto'
            marginTop={12}
            paddingTop={3}>
            {userCards}
        </Pane>
    }

    render() {

        return <Pane
            display='flex'
            flexDirection='column'
            height='100%'>
            <Heading
                size={500}
                paddingBottom={15}>
                Список приглашенных
            </Heading>
            <Pane
                display='flex'>
                <TextInput
                    fontSize={14}
                    marginRight={15}
                    flexGrow={1}
                    className='no-resize'
                    placeholder='Введите имя пользователя'
                    name='description'
                    value={this.state.name}
                    onChange={this.handleChangeInput.bind(this)}/>
                <IconButton icon='search' onClick={this.handleFindBtnClick.bind(this)}/>
            </Pane>
            {!!this.props.users.length && this.getUsersList()}
            {!this.props.users.length && (
                <Pane
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    flexGrow={1}>
                    <Icon icon="info-sign" color='info' marginRight={16} />
                    <Paragraph color='muted' fontSize={12} marginTop={3}>
                        Редактировать список участников Вы также сможете в меню настроек группы
                    </Paragraph>
                </Pane>
            )}
        </Pane>
    }
}

export default connect(
    state => ({
        users: state.groupData.newGroupData.invited,
    }),
    dispatch => ({
        findUser: name => dispatch(findUser(name))
    })
)(AddFormInvitations);
