import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { Main, NavBar, TopBar, MediaPlayer } from './components';
import { Home, Search, Collection } from './pages';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            // main: '#28ff9e',
            main: '#ff285a',
        },
        secondary: {
            main: '#edf2ff',
        },
        background: {
            default: '#000b0f',
            paper: '#00141a',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <NavBar />
                <TopBar />
                <Main>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/search' component={Search} />
                        <Route path='/collection/:id' component={Collection} />
                    </Switch>
                </Main>
                <MediaPlayer />
            </Router>
        </ThemeProvider>
    );
}

export default App;
