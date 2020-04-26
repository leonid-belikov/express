import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {connect} from 'react-redux';

import "./index.css"
import {Pane} from "evergreen-ui"

import MainPage from "./components/MainPage/MainPage";
import Categories from './components/Categories/Categories';
import NavMenu from "./components/Header/NavMenu";
import AuthPage from "./components/AuthPage/AuthPage";


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
                        padding={25}>
                        <Switch>
                            <Route exact path="/" component={MainPage}/>
                            <Route path="/categories" component={Categories}/>
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
