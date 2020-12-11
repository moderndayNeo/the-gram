import React from 'react';
import { Link } from 'react-router-dom';
import Home from './home/home';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import LoginForm from './session/login_form_hook';
import SignupPage from './session/signup/SignupPage'

export default function App() {

    return (
        <div className="app">
            {/* <img className="main-logo" src={window.mainLogoUrl} alt="" /> */}
            {/* <Link to="/signup">Sign Up</Link> */}
            <br />
            {/* <Link to="/login">Login</Link> */}
            {/* <hr /> */}
            <ProtectedRoute exact path="/" component={Home} />
            <AuthRoute exact path="/signup" component={SignupPage} />
            <AuthRoute exact path="/login" component={LoginForm} />
        </div>
    );
}

