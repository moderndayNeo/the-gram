import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import { logoutUser } from '../redux/actions/session_actions';
import Home from './home/home';
import { useDispatch } from 'react-redux';
import { AuthRoute, ProtectedRoute } from '../util/route_util'

export default function App() {

    const dispatch = useDispatch();

    return (
        <div>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
            <button onClick={() => dispatch(logoutUser())}>Log Out</button>
            <ProtectedRoute path="/" component={Home} />
            <AuthRoute exact path="/signup" component={SignupContainer} />
            <AuthRoute exact path="/login" component={LoginContainer} />
        </div>
    );
}
