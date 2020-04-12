import React, {Component} from "react";
import {Card, Text, TextInput, Dialog} from "evergreen-ui";
import CardToolbarBtn from "./CardToolbarBtn";


class CategoryCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.item.name,
            toolbarButtons: [
                {
                    icon: 'edit',
                    top: 5,
                    right: 42,
                    handler: this.editHandler.bind(this),
                },
                {
                    icon: 'trash',
                    top: 5,
                    right: 5,
                    handler: this.deleteHandler.bind(this),
                },
            ],
            editToolbarButtons: [
                {
                    icon: 'key-enter',
                    top: 5,
                    right: 42,
                    handler: this.updateHandler.bind(this),
                },
                {
                    icon: 'cross',
                    top: 5,
                    right: 5,
                    handler: this.cancelHandler.bind(this),
                },
            ],
            mode: 'view',
            showDialog: false
        }
    }

    editHandler() {
        this.setState(Object.assign({}, this.state, {
            mode: 'edit'
        }))
    }

    deleteHandler() {
        this.setState(Object.assign({}, this.state, {
            showDialog: true
        }))
    }

    confirmHandler() {
        const id = this.props.item._id;
        this.props.deleteHandler(id);
    }

    changeHandler(event) {
        const value = event.target.value;
        this.setState(Object.assign({}, this.state, {
            name: value
        }))
    }

    cancelHandler() {
        this.setState(Object.assign({}, this.state, {
            name: this.props.item.name,
            mode: 'view'
        }))
    }

    updateHandler() {
        this.props.updateHandler(this.props.item._id, this.state.name)
        this.setState(Object.assign({}, this.state, {
            mode: 'view'
        }))
    }

    render() {

        let content;
        const mode = this.state.mode;
        const buttonsArr = mode === 'view' ? this.state.toolbarButtons : this.state.editToolbarButtons;

        const toolbar = buttonsArr.map(item => {
            return (
                <CardToolbarBtn
                    key={item.icon}
                    top={item.top}
                    right={item.right}
                    cat_id={this.props.item._id}
                    icon={item.icon}
                    handleClick={item.handler}
                />
            )
        })

        if (mode === 'view') {
            content = <>
                <Text>{this.props.item.name}</Text>
            </>
        } else if (mode === 'edit') {
            content = <>
                <TextInput
                    value={this.state.name}
                    onChange={this.changeHandler.bind(this)}
                />
            </>
        }

        return (<>
            <Card
                display='flex'
                justifyContent='center'
                alignItems='center'
                position='relative'
                width='15%'
                minWidth={200}
                height={120}
                margin={15}
                marginLeft={0}
                padding={15}
                background='yellowTint'
                elevation={2}
                key={this.props.item._id}>
                {content}
                {toolbar}
            </Card>
            <Dialog
                intent="danger"
                isShown={this.state.showDialog}
                hasHeader={false}
                shouldCloseOnOverlayClick={false}
                preventBodyScrolling={true}
                confirmLabel='Удалить'
                cancelLabel='Отмена'
                onConfirm={this.confirmHandler.bind(this)}
                onCloseComplete={() => {
                    this.setState(Object.assign({}, this.state, { showDialog: false }))
                }}>
                {`Удалить категорию "${this.state.name}"?`}
            </Dialog>
        </>
        );
    }
}

export default CategoryCard;
