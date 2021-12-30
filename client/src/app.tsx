import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { Skeleton } from '@mui/material';
import { ContentPane, NavBar, TopBar, NowPlaying } from './components';
import {
    Home,
    Search,
    Collection,
    SignIn,
    SignUp,
    NotFound,
    Genre,
} from './pages';
import { PrivateRoute, IsUserRedirect } from './helpers/routes';
import useAuth from './hooks/useAuth';
import * as ROUTES from './constants/routes';

function App() {
    const { isLoggedIn, loading } = useAuth();

    return !loading ? (
        <Router>
            <Switch>
                <IsUserRedirect
                    exact
                    path={ROUTES.LOGIN}
                    loggedInPath={ROUTES.HOME}
                    isLoggedIn={isLoggedIn}
                >
                    <SignIn />
                </IsUserRedirect>
                <IsUserRedirect
                    exact
                    path={ROUTES.SIGNUP}
                    loggedInPath={ROUTES.HOME}
                    isLoggedIn={isLoggedIn}
                >
                    <SignUp />
                </IsUserRedirect>
                <Route>
                    <NavBar />
                    <TopBar />
                    <ContentPane>
                        <Switch>
                            <Route exact path={ROUTES.HOME} component={Home} />
                            <Route path={ROUTES.BROWSE} component={Search} />
                            <PrivateRoute
                                exact
                                path={ROUTES.ALBUMS}
                                loggedInPath={ROUTES.HOME}
                                isLoggedIn={isLoggedIn}
                                component={Collection}
                            />
                            <PrivateRoute
                                exact
                                path={ROUTES.PLAYLISTS}
                                loggedInPath={ROUTES.HOME}
                                isLoggedIn={isLoggedIn}
                                component={Collection}
                            />
                            <PrivateRoute
                                exact
                                path={ROUTES.PODCASTS}
                                loggedInPath={ROUTES.HOME}
                                isLoggedIn={isLoggedIn}
                                component={Collection}
                            />
                            <PrivateRoute
                                exact
                                path={ROUTES.ARTISTS}
                                loggedInPath={ROUTES.HOME}
                                isLoggedIn={isLoggedIn}
                                component={Collection}
                            />
                            <PrivateRoute
                                exact
                                path={ROUTES.TRACKS}
                                loggedInPath={ROUTES.HOME}
                                isLoggedIn={isLoggedIn}
                                component={Collection}
                            />
                            <PrivateRoute
                                path={`${ROUTES.COLLECTION}*`}
                                loggedInPath={ROUTES.HOME}
                                isLoggedIn={isLoggedIn}
                            >
                                {isLoggedIn ? (
                                    <Redirect to={ROUTES.ALBUMS} />
                                ) : (
                                    <Redirect to={ROUTES.HOME} />
                                )}
                            </PrivateRoute>
                            <Route
                                exact
                                path={`${ROUTES.GENRES}/:genre`}
                                component={Genre}
                            />
                            <Route exact path={`${ROUTES.GENRES}`}>
                                <Redirect to={ROUTES.HOME} />
                            </Route>
                        </Switch>
                    </ContentPane>
                    <NowPlaying />
                </Route>
                <Route path='*' component={NotFound} />
            </Switch>
        </Router>
    ) : (
        <Skeleton variant='rectangular' width='100%' height='100%' />
    );
}

export default App;
