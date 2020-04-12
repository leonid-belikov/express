import React from 'react';
import {Pane, Heading, TextInput, Button, Icon, Text, Spinner, toaster} from "evergreen-ui";
import CategoryCard from "./CategoryCard";

class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            loading: true,
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
                        return 0;
                    })
                } else {
                    categories = data;
                }
            }

            this.setState(Object.assign({}, this.state, {
                name: '',
                categories,
                loading: false,
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
                await this.updateData();
                toaster.success(`Категория "${data.name}" добавлена`)
            }
        } catch (e) {
            console.log('Упс, ошибка: ', e)
        }
    }

    async deleteCategory(id) {
        try {
            const response = await fetch('/api/category/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            });
            const data = await response.json();
            await this.updateData();
            toaster.success(`Категория "${data.name}" удалена`)
        } catch (e) {
            console.log('Упс, ошибка: ', e)
        }
    }

    async updateCategory(id, name) {
        try {
            const response = await fetch('api/category/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id, name
                })
            })
            const data = await response.json();
            this.setState(Object.assign({}, this.state, {
                categories: this.state.categories.map(item => {
                    if (item._id === data._id) return data;
                    return item;
                })
            }))
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

    getListArea() {
        let list;
        if (this.state.loading) return (
            <Pane height={300}
                display='flex'
                justifyContent='center'
                alignItems='center'>
                <Spinner color='red'/>
            </Pane>
            );
        if (this.state.categories?.length > 0) {
            const listItems = this.state.categories.map(item => {
                return (
                    <CategoryCard
                        key={item._id}
                        item={item}
                        updateHandler={this.updateCategory.bind(this)}
                        deleteHandler={this.deleteCategory.bind(this)}
                    />
                )
            });
            list = <>
                <Pane
                    display='flex'
                    flexWrap='wrap'
                    justifyContent='flex-start'>
                    {listItems}
                </Pane>
            </>
        } else {
            list = <>
                <Heading size={400}>Категории отстутствуют</Heading>
                <Text>
                    Чтобы добавить категорию, введите название и нажмите "+"
                </Text>
            </>;
        }
        return list;
    }

    render() {
        const listArea = this.getListArea();

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
                {listArea}
            </Pane>
        );
    }
}

export default Categories;
