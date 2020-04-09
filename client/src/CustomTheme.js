import {createMuiTheme} from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#eceff1',
            light: '#fff',
            dark: '#babdbe',
            contrastText: '#424242'
        },
        secondary: {
            main: '#5c6bc0',
            light: '#8e99f3',
            dark: '#26418f',
            contrastText: '#ffffff'
        },
    },
    typography: {
        fontFamily: [
            'Inter',
            'sans-serif',
        ].join(','),
        fontSize: 15,
    }
});

export default theme;