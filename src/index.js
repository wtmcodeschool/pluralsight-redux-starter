import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute} from 'react-router';
import { Provider } from 'mobx-react';
import ControlBox from './components/ControlBox';
import AddByUrl from './components/AddByUrl';
import SearchGiphy from './components/SearchGiphy';
import Library from './components/Library';
import SearchResults from './components/SearchResults';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import LogOut from './components/LogOut';
import ImageStore from './stores/ImageStore';
import UserStore from './stores/UserStore';
import Welcome from './components/Welcome';

const imageStore = new ImageStore();
const userStore = new UserStore();

ReactDOM.render(
  <Provider imageStore={imageStore} userStore={userStore}>
    <Router history={browserHistory}>
      <Route path="/" component={ControlBox}>
        <IndexRoute component={Welcome} />
        <Route path="/library" component={Library} />
        <Route path="/addbyurl" component={AddByUrl} />
        <Route path="/searchgiphy" component={SearchGiphy}>
          <Route path="/searchresults" component={SearchResults} />
        </Route>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/logout" component={LogOut} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('app'));
