import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { Skeleton } from '@mui/material';
import { ContentPane } from './components';
import { NavBar, TopBar, NowPlaying } from './containers';
import {
    HomePage,
    SearchPage,
    CollectionPage,
    FavoritePage,
    SignInPage,
    SignUpPage,
    TracksPage,
    NotFoundPage,
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
                    <SignInPage />
                </IsUserRedirect>
                <IsUserRedirect
                    exact
                    path={ROUTES.SIGNUP}
                    loggedInPath={ROUTES.HOME}
                    isLoggedIn={isLoggedIn}
                >
                    <SignUpPage />
                </IsUserRedirect>
                <Route>
                    <NavBar />
                    <TopBar />
                    <ContentPane>
                        <Switch>
                            <Route
                                exact
                                path={ROUTES.HOME}
                                component={HomePage}
                            />
                            <Route
                                path={ROUTES.BROWSE}
                                component={SearchPage}
                            />
                            <PrivateRoute
                                exact
                                path={ROUTES.ALBUMS}
                                loggedInPath={ROUTES.HOME}
                                isLoggedIn={isLoggedIn}
                                component={CollectionPage}
                            />
                            <PrivateRoute
                                exact
                                path={ROUTES.PLAYLISTS}
                                loggedInPath={ROUTES.HOME}
                                isLoggedIn={isLoggedIn}
                                component={CollectionPage}
                            />
                            <PrivateRoute
                                exact
                                path={ROUTES.PODCASTS}
                                loggedInPath={ROUTES.HOME}
                                isLoggedIn={isLoggedIn}
                                component={CollectionPage}
                            />
                            <PrivateRoute
                                exact
                                path={ROUTES.ARTISTS}
                                loggedInPath={ROUTES.HOME}
                                isLoggedIn={isLoggedIn}
                                component={CollectionPage}
                            />
                            <PrivateRoute
                                exact
                                path={ROUTES.TRACKS}
                                loggedInPath={ROUTES.HOME}
                                isLoggedIn={isLoggedIn}
                                component={FavoritePage}
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
                                path={`${ROUTES.GENRE}/:genre`}
                                component={TracksPage}
                            />
                            <Route exact path={`${ROUTES.GENRE}`}>
                                <Redirect to={ROUTES.HOME} />
                            </Route>
                        </Switch>
                    </ContentPane>
                    <NowPlaying />
                </Route>
                <Route path='*' component={NotFoundPage} />
            </Switch>
        </Router>
    ) : (
        <Skeleton variant='rectangular' width='100%' height='100%' />
    );
}

export default App;
