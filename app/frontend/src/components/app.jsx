import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import Home from './home/home';

export default class App extends Component {
    render() {
        return (
            <div>
                <Link to="/signup">Sign Up</Link>
                <Link to="/login">Login</Link>
                <Route exact path="/" component={Home} />
                <Route path="/signup" component={SignupContainer} />
                <Route path="/login" component={LoginContainer} />
            </div>
        );
    }
}
