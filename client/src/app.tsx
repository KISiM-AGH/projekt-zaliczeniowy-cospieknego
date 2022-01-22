import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { ContentPane, Loader } from './components';
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
    ShowAllPage,
    ArtistPage,
} from './pages';
import { PrivateRoute, IsUserRedirect } from './helpers/routes';
import useAuth from './hooks/useAuth';
import * as ROUTES from './constants/routes';

// @TODO Clean up the routes

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
                                path={ROUTES.TRACKS}
                                loggedInPath={ROUTES.HOME}
                                isLoggedIn={isLoggedIn}
                                component={FavoritePage}
                            />
                            <PrivateRoute
                                exact
                                path={[
                                    ROUTES.ALBUMS,
                                    ROUTES.PLAYLISTS,
                                    ROUTES.PODCASTS,
                                    ROUTES.ARTISTS,
                                ]}
                                loggedInPath={ROUTES.HOME}
                                isLoggedIn={isLoggedIn}
                                component={CollectionPage}
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
                                component={SearchPage}
                            />
                            <Route>
                                <Route
                                    exact
                                    path={`${ROUTES.ARTIST}/:id`}
                                    render={(props) => (
                                        <ArtistPage
                                            fetch={`artists/${props.match.params.id}`}
                                        />
                                    )}
                                />
                                <Route
                                    exact
                                    path={`${ROUTES.ALBUM}/:id`}
                                    render={(props) => (
                                        <TracksPage
                                            fetch={`albums/${props.match.params.id}`}
                                        />
                                    )}
                                />
                                <Route
                                    exact
                                    path={`${ROUTES.PLAYLIST}/:id`}
                                    render={(props) => (
                                        <TracksPage
                                            fetch={`playlists/${props.match.params.id}`}
                                        />
                                    )}
                                />
                            </Route>
                            <Route exact path={`${ROUTES.GENRE}`}>
                                <Redirect to={ROUTES.HOME} />
                            </Route>
                            <Route exact path='/albums'>
                                <ShowAllPage category='albums' />
                            </Route>
                        </Switch>
                    </ContentPane>
                    <NowPlaying />
                </Route>
                <Route path='*' component={NotFoundPage} />
            </Switch>
        </Router>
    ) : (
        <Loader />
    );
}

export default App;
