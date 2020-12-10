import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import { logoutUser } from '../redux/actions/session';
import Home from './home/home';
import { useDispatch } from 'react-redux';

export default function App() {

    const dispatch = useDispatch();

    return (
        <div>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
            <button onClick={() => dispatch(logoutUser())}>Log Out</button>
            <Route path="/" component={Home} />
            <Route path="/signup" component={SignupContainer} />
            <Route path="/login" component={LoginContainer} />
        </div>
    );
}
