import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { ContentPane, NavBar, TopBar, MediaPlayer } from './components';
import { Home, Search, Collection, Login, Register } from './pages';

function App() {
    return (
        <Router>
            <NavBar />
            <TopBar />
            <ContentPane>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/search' component={Search} />
                    <Route path='/collection/albums' component={Collection} />
                    <Route
                        path='/collection/playlists'
                        component={Collection}
                    />
                    <Route path='/collection/podcasts' component={Collection} />
                    <Route path='/collection/artists' component={Collection} />
                    <Route path='/collection/*'>
                        <Redirect to='/collection/albums' />
                    </Route>
                </Switch>
            </ContentPane>
            <MediaPlayer />
            <Switch>
                <Route exact path='/register' component={Register} />
            </Switch>
        </Router>
    );
}

export default App;
