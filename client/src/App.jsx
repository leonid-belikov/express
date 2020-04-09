import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {ThemeProvider, makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";

import "./index.css"
import customTheme from './CustomTheme'

import MainPage from "./components/MainPage/MainPage";
import Categories from './components/Categories/Categories';
import NavMenu from "./components/Header/NavMenu";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: customTheme.palette.primary.main,
    },
    contentArea: {
        minHeight: '100vh',
        padding: '20px 20px 40px',
    },
    contentPaper: {
        height: '100%',
        padding: 20,
        boxShadow: '-10px 10px 10px 0px rgba(0, 0, 0, 0.2), -5px 5px 13px 1px rgba(0, 0, 0, 0.1)',
        backgroundColor: customTheme.palette.primary.light,
    },
}));

const App = () => {

    const classes = useStyles();

    return (
        <div>
            <ThemeProvider theme={customTheme}>
                <BrowserRouter>
                    <Grid container className={classes.root}>
                        <Grid item md={2} lg={1}>
                            <NavMenu/>
                        </Grid>
                        <Grid item md={10} lg={11} className={classes.contentArea}>
                            <Paper className={classes.contentPaper}>
                                <Switch>
                                    <Route exact path="/" component={MainPage}/>}/>
                                    <Route path="/categories" component={Categories}/>
                                </Switch>
                            </Paper>
                        </Grid>
                    </Grid>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    )
};

export default App;
