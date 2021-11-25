import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { ContentPane, NavBar, TopBar, MediaPlayer } from './components';
import { Home, Search, Collection, SignIn, SignUp, NotFound } from './pages';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/login' component={SignIn} />
                <Route exact path='/signup' component={SignUp} />
                <Route>
                    <NavBar />
                    <TopBar />
                    <ContentPane>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route path='/search' component={Search} />
                            <Route
                                exact
                                path='/collection/albums'
                                component={Collection}
                            />
                            <Route
                                exact
                                path='/collection/playlists'
                                component={Collection}
                            />
                            <Route
                                exact
                                path='/collection/podcasts'
                                component={Collection}
                            />
                            <Route
                                exact
                                path='/collection/artists'
                                component={Collection}
                            />
                            <Route path='/collection/*'>
                                <Redirect to='/collection/albums' />
                            </Route>
                        </Switch>
                    </ContentPane>
                    <MediaPlayer />
                </Route>
                <Route path='*' component={NotFound} />
            </Switch>
        </Router>
    );
}

export default App;
