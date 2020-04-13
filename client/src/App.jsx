import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import "./index.css"
import {Pane} from "evergreen-ui"

import MainPage from "./components/MainPage/MainPage";
import Categories from './components/Categories/Categories';
import NavMenu from "./components/Header/NavMenu";

const App = () => {

  return (
    <Pane
      display='flex'
      minHeight='100vh'
      padding={25}>
      <BrowserRouter>
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
      </BrowserRouter>
    </Pane>
  )
};

export default App;
