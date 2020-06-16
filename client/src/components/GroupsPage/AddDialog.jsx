import React, {Component} from "react";
import {connect} from "react-redux";

import {Dialog, Tablist, Tab, Pane, Heading, TextInput, defaultTheme, Icon, toaster} from "evergreen-ui";
import AddFormDescription from "./AddFormDescription";
import AddFormAccounts from "./AddFormAccounts";
import AddFormInvitations from "./AddFormInvitations";
import {createGroup} from "../../api";


class AddDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: '',
            nameWasEmpty: true,
            tabs: [
                {
                    title: 'Создайте счета',
                    icon: 'bank-account',
                    content: () => <AddFormAccounts/>,
                },
                {
                    title: 'Заполните описание',
                    icon: 'manual',
                    content: () => <AddFormDescription/>
                },
                {
                    title: 'Пригласите участников',
                    icon: 'new-person',
                    content: () => <AddFormInvitations/>
                },
            ],
            selectedTabIndex: 0,
        }
    }

    handleInputChange(e) {
        const value = e.target.value;
        this.setState({
            ...this.state,
            groupName: value,
        })
    }

    handleInputFocusOut() {
        if (!this.state.groupName && this.state.nameWasEmpty) return;
        const text = this.state.groupName.trim();
        if (!text && this.state.nameWasEmpty) {
            this.setState({
                ...this.state,
                groupName: '',
            })
            return;
        }
        this.setState({
            ...this.state,
            groupName: text,
            nameWasEmpty: !text,
        })
    }

    async handleConfirmBtnClick() {
        if (!this.state.groupName) {
            toaster.notify('Необходимо указать название группы', {id: 'groupNameWarning'})
            return
        } else if (!this.props.newGroupData.accounts.length) {
            toaster.notify('Необходимо создать хотя бы один счет', {id: 'accountsWarning'})
            return
        }
        const data = {
            name: this.state.groupName,
            description: this.props.newGroupData.description,
            accounts: this.props.newGroupData.accounts,
            invited: this.props.newGroupData.invited,
        }
        try {
            const result = await createGroup(data);
            if (result.success) {
                toaster.success(result.message)
                this.setState({
                    ...this.state,
                    groupName: '',
                })
                this.props.closeHandler(true);
            } else {
                toaster.danger(result.message, {id: 'createGroupError'})
            }
        } catch (e) {
            console.log('Ошибка в обработчике handleConfirmBtnClick', e)
        }
    }

    getHeader() {
        return (
            <Pane
                paddingTop={8}
                paddingX={5}
                width='100%'
                display='flex'
                justifyContent='spaceBetween'>
                <Heading
                    width={185}
                    size={600}
                    paddingTop={2}>
                    Создать группу
                </Heading>
                <TextInput
                    marginLeft={15}
                    fontSize={14}
                    width='100%'
                    placeholder="Введите название группы"
                    value={this.state.groupName}
                    onChange={this.handleInputChange.bind(this)}
                    onBlur={this.handleInputFocusOut.bind(this)}/>
            </Pane>
        )
    }

    handleCloseDialog() {
        this.props.closeHandler();
        this.setState({
            ...this.state,
            selectedTabIndex: 0,
        })
    }

    render() {

        return <Dialog
            width={800}
            isShown={this.props.show}
            header={this.getHeader()}
            hasClose={false}
            cancelLabel='Отмена'
            confirmLabel='Создать'
            preventBodyScrolling={true}
            shouldCloseOnOverlayClick={false}
            onConfirm={this.handleConfirmBtnClick.bind(this)}
            onCloseComplete={this.handleCloseDialog.bind(this)}>
            <Pane
                display='flex'
                flexDirection='column'>
                <Tablist
                    className='add-dialog__tab-list'
                    display='flex'
                    justifyContent='spaceBetween'
                    paddingX={5}>
                    {this.state.tabs.map((tab, index) => (
                        <Tab
                            height={40}
                            width='33%'
                            background={defaultTheme.palette.purple.light}
                            key={tab.title}
                            onSelect={() => this.setState({
                                ...this.state,
                                selectedTabIndex: index,
                            })}
                            isSelected={index === this.state.selectedTabIndex}>
                            <Icon icon={tab.icon} marginRight={10}/>{tab.title}
                        </Tab>
                    ))}
                </Tablist>
                <Pane
                    flexGrow={1}
                    height={240}
                    overflow='hidden'
                    paddingTop={24}
                    paddingX={5}>
                    {this.state.tabs.map((tab, index) => (
                        <Pane
                            key={tab.title}
                            display={index === this.state.selectedTabIndex ? 'block' : 'none'}
                            height='100%'>
                            {tab.content()}
                        </Pane>
                    ))}
                </Pane>
            </Pane>
        </Dialog>

    }

}

export default connect(
    state => ({
        newGroupData: state.groupData.newGroupData,
    })
)(AddDialog);
