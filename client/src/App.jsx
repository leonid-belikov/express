import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {connect} from 'react-redux';

import "./index.css"
import {Pane} from "evergreen-ui"

import MainPage from "./components/MainPage/MainPage";
import NavMenu from "./components/NavMenu/NavMenu";
import AuthPage from "./components/AuthPage/AuthPage";
import GroupsPage from "./components/GroupsPage/GroupsPage";
import CategoriesPage from './components/CategoriesPage/CategoriesPage';


class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/auth' component={AuthPage}/>
                    {!this.props.authUser && <Redirect to='/auth'/>}
                </Switch>
                {this.props.authUser && <Pane
                    display='flex'
                    minHeight='100vh'
                    padding={25}>
                    <NavMenu/>
                    <Pane
                        width={'100%'}
                        elevation={4}
                        backgroundColor="white"
                        marginLeft={160}
                        padding={25}>
                        <Switch>
                            <Route exact path="/" component={MainPage}/>
                            <Route path="/categories" component={CategoriesPage}/>
                            <Route path="/groups" component={GroupsPage}/>
                        </Switch>
                    </Pane>
                </Pane>}
            </BrowserRouter>
        )
    }
}

export default connect(
    state => ({
        authUser: state.userData.authUser,
    })
)(App);
