import React from 'react';
import {
    Button,
    TextField,
    List,
    ListItem,
    ListItemText,
    Typography
} from '@material-ui/core'
import Grid from "@material-ui/core/Grid";

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
                categories = data;
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
            <Grid item xs={12}>
                <Typography variant="h6">Категории отстутствуют</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1">
                    Чтобы добавить категорию, введите название и нажмите "Добавить категорию"
                </Typography>
            </Grid>
        </>;
        if (this.state.categories.length > 0) {
            const listItems = this.state.categories.map(item => {
                return (
                    <ListItem className="item" key={item._id}>
                        <ListItemText>{item.name}</ListItemText>
                        <Button
                            variant="contained"
                            color="secondary"
                            data-id={item._id}
                            onClick={this.deleteCategory.bind(this)}>
                            <i className={"fa fa-trash fa-lg"}/>
                        </Button>
                    </ListItem>
                )
            });
            list = <>
                <Grid item xs={12}>
                    <Typography variant="h6">Имеются категории:</Typography>
                </Grid>
                <List>
                    {listItems}
                </List>
            </>
        }

        return (
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h4">Категории</Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="outlined-basic"
                        type="text"
                        color={"secondary"}
                        label="Новая категория"
                        variant="outlined"
                        size="small"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChangeHandler.bind(this)}
                    />
                    <Button variant="contained" color="secondary" onClick={this.addCategory.bind(this)}>
                        <i className={"fa fa-plus fa-lg"}/>
                    </Button>
                </Grid>
                {list}
            </Grid>
        );
    }
}

export default Categories;
