import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { Container, NavBar, TopBar, MediaPlayer } from './components';
import { Home, Search, Library } from './pages';

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
                <Container>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/search' component={Search} />
                        <Route
                            path='/collection'
                            render={({ match: { url } }) => (
                                <>
                                    <Route
                                        path={`${url}/albums`}
                                        component={Library}
                                    />
                                    <Route
                                        path={`${url}/playlists`}
                                        component={Library}
                                    />
                                    <Route
                                        path={`${url}/podcasts`}
                                        component={Library}
                                    />
                                    <Route
                                        path={`${url}/artistsT`}
                                        component={Library}
                                    />
                                </>
                            )}
                        />
                    </Switch>
                </Container>
                <MediaPlayer />
            </Router>
        </ThemeProvider>
    );
}

export default App;
