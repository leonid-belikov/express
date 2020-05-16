import React, {Component} from "react";
import {connect} from "react-redux";
import {Pane, Heading, Button,Paragraph, Spinner} from "evergreen-ui";
import {respondInvitation, clearNewGroupData, getGroups, getInvitations} from "../../redux/actions/groupActions";

import './GroupsPage.css'

import AddDialog from "./AddDialog";
import GroupCard from "./GroupCard";
import GroupsListArrow from "./GroupsListArrow";
import InvitationCard from "./InvitationCard";
import InvitationsListArrow from "./InvitationsListArrow";


class GroupsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddDialog: false,
            loadingGroups: true,
            groupList: null,
            loadingInvitations: true,
            invitationList: null,
        }
    }

    componentDidMount() {
        this.props.getGroups();
        this.props.getInvitations();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.groups !== this.props.groups) {
            this.setState({
                ...this.state,
                groupList: this.getGroupList(),
                loadingGroups: false,
            });
        }
        if (prevProps.invitations !== this.props.invitations) {
            this.setState({
                ...this.state,
                invitationList: this.getInvitationList(),
                loadingInvitations: false,
            });
        }
    }

    showSpinner(section) {
        const fieldName = `loading${section}`
        this.setState({
            ...this.state,
            [fieldName]: true,
        })
    }

    openAddDialog() {
        this.setState({
            ...this.state,
            showAddDialog: true,
        })
    }

    handleCloseDialog(needUpdate=false) {
        this.props.clearForm();
        this.setState({
            ...this.state,
            showAddDialog: false,
        })
        if (needUpdate) {
            this.showSpinner('Groups');
            this.props.getGroups();
        }
    }

    getGroupList() {
        if (!this.props.groups) return [];
        return this.props.groups.map(item => <GroupCard key={item._id} data={item}/>);
    }

    getInvitationList() {
        if (!this.props.invitations) return [];
        return this.props.invitations.map(item => <InvitationCard
            key={item._id}
            data={item}
            acceptHandler={this.props.acceptInvitation.bind(this, item._id)}
            declineHandler={this.props.declineInvitation.bind(this, item._id)}
        />);
    }

    getContentGroups() {
        if (!!this.state.groupList.length) {
            return this.state.groupList;
        } else {
            return <Pane
                marginX='auto'
                display='flex'
                alignItems='center'
                justifyContent='center'
                minHeight={300}>

                <GroupsListArrow/>
                <Paragraph color='muted'>
                    Нет доступных групп, самое время создать
                </Paragraph>
            </Pane>
        }
    }

    getContentInvitations() {
        if (!!this.state.invitationList.length) {
            return this.state.invitationList;
        } else {
            return <Pane
                marginX='auto'
                display='flex'
                alignItems='center'
                justifyContent='center'
                minHeight={300}>

                <InvitationsListArrow/>
                <Paragraph color='muted'>
                    Приглашений пока не поступало, попробуйте обновить список
                </Paragraph>
            </Pane>
        }
    }

    refreshInvitationsList() {
        this.showSpinner('Invitations');
        this.props.getInvitations();
    }

    render() {

        return <>
            <Pane>
                <Heading size={900} marginBottom={30}>Группы</Heading>


                <Heading
                    size={300}
                    marginBottom={20}
                    className='section-header'>
                    <div className='section-header__text'>Доступные группы</div>
                </Heading>
                <Button iconBefore='plus' onClick={this.openAddDialog.bind(this)}>
                    Новая группа
                </Button>

                {this.state.loadingGroups && <Pane
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    minHeight={300}>
                    <Spinner/>
                </Pane>}
                {!this.state.loadingGroups && <Pane
                    position='relative'
                    display='flex'
                    flexWrap='wrap'
                    marginTop={20}
                    marginBottom={82}
                    paddingTop={10}>
                    {this.getContentGroups()}
                </Pane>}


                <Heading
                    size={300}
                    marginBottom={30}
                    className='section-header'>
                    <div className='section-header__text'>Приглашения</div>
                </Heading>
                <Button iconBefore='refresh' onClick={this.refreshInvitationsList.bind(this)}>
                    Обновить список приглашений
                </Button>

                {this.state.loadingInvitations && <Pane
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    height={362}>
                    <Spinner/>
                </Pane>}
                {!this.state.loadingInvitations && <Pane
                    position='relative'
                    display='flex'
                    flexWrap='wrap'
                    marginTop={20}
                    marginBottom={32}
                    paddingTop={10}>
                    {this.getContentInvitations()}
                </Pane>}

            </Pane>

            <AddDialog
                show={this.state.showAddDialog}
                closeHandler={this.handleCloseDialog.bind(this)}
            />
        </>;
    }
}

export default connect(
    state => ({
        groups: state.groupData.groups,
        invitations: state.groupData.invitations,
    }),
    dispatch => ({
        clearForm: () => dispatch(clearNewGroupData()),
        getGroups: () => dispatch(getGroups()),
        getInvitations: () => dispatch(getInvitations()),
        acceptInvitation: (groupId) => dispatch(respondInvitation(groupId, true)),
        declineInvitation: (groupId) => dispatch(respondInvitation(groupId, false)),
    })
)(GroupsPage);
