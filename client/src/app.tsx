import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { ContentPane, NavBar, TopBar, NowPlaying } from './components';
import { Home, Search, Collection, SignIn, SignUp, NotFound } from './pages';
import { PrivateRoute, IsUserRedirect } from './helpers/routes';
import useAuth from './hooks/useAuth';

function App() {
    const { isLoggedIn }: { isLoggedIn: boolean } = useAuth();

    return (
        <Router>
            <Switch>
                <IsUserRedirect
                    exact
                    path='/login'
                    isLoggedIn={isLoggedIn}
                    loggedInPath={''}
                >
                    <SignIn />
                </IsUserRedirect>
                <IsUserRedirect
                    exact
                    path='/signup'
                    isLoggedIn={isLoggedIn}
                    loggedInPath={''}
                >
                    <SignUp />
                </IsUserRedirect>
                <Route>
                    <NavBar />
                    <TopBar />
                    <ContentPane>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route path='/search' component={Search} />
                            <PrivateRoute
                                exact
                                path='/collection/albums'
                                component={Collection}
                                isLoggedIn={isLoggedIn}
                                loggedInPath={''}
                            />
                            <PrivateRoute
                                exact
                                path='/collection/playlists'
                                component={Collection}
                                isLoggedIn={isLoggedIn}
                                loggedInPath={''}
                            />
                            <PrivateRoute
                                exact
                                path='/collection/podcasts'
                                component={Collection}
                                isLoggedIn={isLoggedIn}
                                loggedInPath={''}
                            />
                            <PrivateRoute
                                exact
                                path='/collection/artists'
                                component={Collection}
                                isLoggedIn={isLoggedIn}
                                loggedInPath={''}
                            />
                            <PrivateRoute
                                path='/collection*'
                                isLoggedIn={isLoggedIn}
                                loggedInPath={''}
                            >
                                {isLoggedIn ? (
                                    <Redirect to='/collection/albums' />
                                ) : (
                                    <Redirect to='/' />
                                )}
                            </PrivateRoute>
                        </Switch>
                    </ContentPane>
                    <NowPlaying />
                </Route>
                <Route path='*' component={NotFound} />
            </Switch>
        </Router>
    );
}

export default App;
