import React, {Component} from "react";
import {connect} from "react-redux";
import {Pane, Heading, Button,Paragraph, Spinner} from "evergreen-ui";
import ReactRough, {Curve} from 'react-rough'
import {clearNewGroupData, getGroups} from "../../redux/actions/groupActions";

import './GroupsPage.css'

import AddDialog from "./AddDialog";
import GroupCard from "./GroupCard";
import GroupsPageArrow from "./GroupsPageArrow";


class GroupsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddDialog: false,
            loading: true,
            groupList: null,
        }
    }

    componentDidMount() {
        this.props.getGroups();
    }

    showSpinner() {
        this.setState({
            ...this.state,
            loading: true,
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
            this.showSpinner();
            this.props.getGroups();
        }
    }

    getGroupList() {
        if (!this.props.groups) return [];
        return this.props.groups.map(item => <GroupCard key={item._id} data={item}/>);
    }

    getContent() {
        if (!!this.state.groupList.length) {
            return this.state.groupList;
        } else {
            return <Pane
                marginX='auto'
                display='flex'
                alignItems='center'
                justifyContent='center'
                minHeight={300}>

                <GroupsPageArrow/>
                <Paragraph color='muted'>
                    Нет доступных групп, самое время создать
                </Paragraph>
            </Pane>
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.groups === this.props.groups) return
        this.setState({
            ...this.state,
            groupList: this.getGroupList(),
            loading: false,
        });
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
                {this.state.loading && <Pane
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    minHeight={300}>
                    <Spinner/>
                </Pane>}
                {!this.state.loading && <Pane
                    position='relative'
                    display='flex'
                    flexWrap='wrap'
                    marginTop={20}
                    marginBottom={32}
                    paddingTop={10}>
                    {this.getContent()}
                </Pane>}
                <Heading
                    size={300}
                    marginBottom={30}
                    className='section-header'>
                    <div className='section-header__text'>Приглашения</div>
                </Heading>
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
    }),
    dispatch => ({
        clearForm: () => dispatch(clearNewGroupData()),
        getGroups: () => dispatch(getGroups())
    })
)(GroupsPage);
