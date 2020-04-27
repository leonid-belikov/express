import React, {Component} from "react";
import {connect} from "react-redux";
import {Pane, TextInput, IconButton, toaster, Table, Paragraph, Icon, Heading} from "evergreen-ui";
import './GroupsPage.css'

import {changeNewGroupAccounts} from "../../redux/actions/groupActions";

import AccountTableRow from "./AccountTableRow";


class AddFormAccounts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            invalidName: false,
        }
    }

    handleChangeInput(e) {
        const name = e.target.value;
        this.setState({
            ...this.state,
            invalidName: false,
            name
        })
    }

    handleAddBtnClick() {
        const name = this.state.name.trim();
        if (!name) return;
        const accounts = this.props.accounts.slice();
        if (accounts.includes(name)) {
            toaster.danger('Счет с таким названием уже создан', {
                id: 'account-name-is-busy'
            });
            this.setState({
                ...this.state,
                invalidName: true,
            })
            return;
        }
        accounts.push(name);
        this.props.changeAccounts(accounts);
        this.setState({
            ...this.state,
            name: ''
        })
    }

    handleRemoveRow(name) {
        const accounts = this.props.accounts.filter(item => item !== name);
        this.props.changeAccounts(accounts);
    }

    getAccountsList() {
        const rows = this.props.accounts.map(name => (
            <AccountTableRow
                key={name}
                name={name}
                handleRemoveRow={this.handleRemoveRow.bind(this)}
            />
        ))
        return <Table marginTop={20}>
            <Table.Body maxHeight={145}>
                {rows}
            </Table.Body>
        </Table>;
    }

    render() {

        return <Pane
            display='flex'
            flexDirection='column'
            height='100%'>
            <Heading
                size={500}
                paddingBottom={15}>
                Счета
            </Heading>
            <Pane
                display='flex'>
                <TextInput
                    fontSize={14}
                    marginRight={15}
                    flexGrow={1}
                    className='no-resize'
                    placeholder='Введите название для нового счета'
                    name='description'
                    value={this.state.name}
                    isInvalid={this.state.invalidName}
                    onChange={this.handleChangeInput.bind(this)}/>
                <IconButton icon='plus' onClick={this.handleAddBtnClick.bind(this)}/>
            </Pane>
            {!!this.props.accounts.length && this.getAccountsList()}
            {!this.props.accounts.length && (
                <Pane
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    flexGrow={1}>
                    <Icon icon="info-sign" color='info' marginRight={16} />
                    <Paragraph color='muted' fontSize={12} marginTop={3}>
                        Необходимо создать хотя бы один счет
                    </Paragraph>
                </Pane>
            )}
        </Pane>
    }
}

export default connect(
    state => ({
        accounts: state.groupData.newGroupData.accounts,
    }),
    dispatch => ({
        changeAccounts: accounts => dispatch(changeNewGroupAccounts(accounts))
    })
)(AddFormAccounts);
