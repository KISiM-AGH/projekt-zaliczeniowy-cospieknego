import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { ContentPane, NavBar, TopBar, MediaPlayer } from './components';
import { Home, Search, Collection } from './pages';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ff2850',
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
                <ContentPane>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/search' component={Search} />
                        <Route
                            path='/collection/albums'
                            component={Collection}
                        />
                        <Route
                            path='/collection/playlists'
                            component={Collection}
                        />
                        <Route
                            path='/collection/podcasts'
                            component={Collection}
                        />
                        <Route
                            path='/collection/artists'
                            component={Collection}
                        />
                        <Route path='/collection/*'>
                            <Redirect to='/collection/albums' />
                        </Route>
                    </Switch>
                </ContentPane>
                <MediaPlayer />
            </Router>
        </ThemeProvider>
    );
}

export default App;
