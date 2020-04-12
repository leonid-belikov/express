import React from 'react';
import {Pane, Heading, TextInput, Button, Icon, Card, Text} from "evergreen-ui";

class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            categories: []
        }
    }

    componentDidMount() {
        this.updateData();
    }

    async updateData() {
        try {
            const response = await fetch('/api/category/show', {
                method: 'GET'
            });
            const data = await response.json();
            let categories = [];
            if (data !== {}) {
                if (data.length) {
                    categories = data.sort((a, b) => {
                        if (a.name > b.name) return 1;
                        if (a.name < b.name) return -1;
                        if (a.name === b.name) return 0;
                    })
                } else {
                    categories = data;
                }
            }

            this.setState(Object.assign({}, this.state, {
                name: '',
                categories
            }))
        } catch (e) {
            console.log('Упс, ошибка: ', e)
        }
    }

    async addCategory() {
        try {
            const response = await fetch('/api/category/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name
                })
            });
            const data = await response.json();
            if (data.message) {
                console.log(data.message)
            } else {
                console.log(`Категория ${data.name} добавлена`)
                await this.updateData();
            }
        } catch (e) {
            console.log('Упс, ошибка: ', e)
        }
    }

    async deleteCategory(event) {
        try {
            const id = event.target.dataset.id ?? event.target.parentElement.dataset.id ?? event.target.parentElement.parentElement.dataset.id;
            const response = await fetch('/api/category/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            });
            const data = await response.json();
            console.log(`Категория ${data.name} удалена`)
            await this.updateData();
        } catch (e) {
            console.log('Упс, ошибка: ', e)
        }
    }

    onChangeHandler(event) {
        const name = event.target.value;
        this.setState(Object.assign({}, this.state, {
            name
        }))
    }

    render() {
        let list = <>
            <Heading size={400}>Категории отстутствуют</Heading>
            <Text>
                Чтобы добавить категорию, введите название и нажмите "+"
            </Text>
        </>;
        if (this.state.categories.length > 0) {
            const listItems = this.state.categories.map(item => {
                return (
                    <Card
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        position='relative'
                        width='15%'
                        height={100}
                        margin={10}
                        marginLeft={0}
                        elevation={2}
                        key={item._id}>
                        <Text >{item.name}</Text>
                        <Button
                            appearance='minimal'
                            position='absolute'
                            top={5}
                            right={5}
                            data-id={item._id}
                            onClick={this.deleteCategory.bind(this)}>
                            <Icon icon='trash' size={15}/>
                        </Button>
                    </Card>
                )
            });
            list = <>
                <Pane
                    display='flex'
                    flexWrap='wrap'
                    justifyContent='flex-start'
                    marginX='-10px'>
                    {listItems}
                </Pane>
            </>
        }


        return (
            <Pane>
                <Heading size={900} marginBottom={30}>Категории</Heading>
                <TextInput
                    marginBottom={30}
                    marginRight={15}
                    placeholder="Добавить категорию"
                    value={this.state.name}
                    onChange={this.onChangeHandler.bind(this)}
                />
                <Button onClick={this.addCategory.bind(this)}>
                    <Icon icon='plus'/>
                </Button>
                {list}
            </Pane>
        );
    }
}

export default Categories;
