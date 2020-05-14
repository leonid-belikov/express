import React, {Component} from "react";
import {connect} from "react-redux"

import {Heading, Pane, Textarea} from "evergreen-ui";
import './GroupsPage.css'
import {changeNewGroupDescription} from "../../redux/actions/groupActions";


class AddFormDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        }
    }

    handleTextareaChange(e) {
        const text = e.target.value;
        this.setState({
            ...this.state,
            text,
        })
    }

    handleTextareaFocusOut() {
        const text = this.state.text.trim();
        this.setState({
            ...this.state,
            text,
        })
        if (text === this.props.description) return;
        this.props.changeDescription(text);
    }

    render() {

        return <Pane>
            <Heading
                size={500}
                paddingBottom={15}>
                Описание
            </Heading>
            <Textarea
                className='no-resize'
                placeholder='Введите описание группы'
                paddingTop={6}
                letterSpacing='normal'
                name='description'
                value={this.state.text}
                onChange={this.handleTextareaChange.bind(this)}
                // onFocus={this.handleTextareaFocusIn.bind(this)}
                onBlur={this.handleTextareaFocusOut.bind(this)}
                rows={8}/>
        </Pane>
    }
}

export default connect(
    state => ({
        description: state.groupData.newGroupData.description,
    }),
    dispatch => ({
        changeDescription: text => dispatch(changeNewGroupDescription(text)),
    })
)(AddFormDescription);
