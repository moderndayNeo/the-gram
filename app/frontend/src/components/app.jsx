import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SignupContainer from './session/signup_container'
import Home from './home/home'

export default class App extends Component {
    render() {
        return (
            <div>
                <Route path="/" component={Home} />
                <Route path="/signup" component={SignupContainer} />
            </div>
        );
    }
}
