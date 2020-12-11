import React from 'react';
import { Link } from 'react-router-dom';
import Home from './home/home';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
// import logo from '../../../assets/images/the-gram-logo.png'
import logo from '../assets/the-gram-logo.png';
import LoginForm from './session/login_form_hook';
import SignupForm from './session/signup_form_hook';

export default function App() {

    return (
        <div>
            <Link to="/signup">Sign Up</Link>
            <br />
            <Link to="/login">Login</Link>
            <hr />
            <img className="main-logo" src={logo} alt="" />

            <ProtectedRoute exact path="/" component={Home} />
            <AuthRoute exact path="/signup" component={SignupForm} />
            <AuthRoute exact path="/login" component={LoginForm} />
        </div>
    );
}



