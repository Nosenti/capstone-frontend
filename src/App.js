import React,{Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import ConfirmPassword from './components/auth/ConfirmPassword';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PendingPosts from './components/posts/PendingPosts';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import PrivateRoute from './components/routing/PrivateRoute';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

//Redux
import {Provider} from 'react-redux';
import store from './store';

// check local storage every time
if(localStorage.token){
    setAuthToken(localStorage.token)
  }


const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
   
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar/>
          <Route exact path="/" component={Landing}/>
          <section className="container">
            <Alert/>
            <Switch>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/confirm-password" component={ConfirmPassword}/>
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
              <PrivateRoute exact path="/pending" component={PendingPosts}/>
              <PrivateRoute exact path="/posts" component={Posts}/>
              <PrivateRoute exact path="/posts/:id" component={Post}/>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
      

    
  );
}

export default App;
