import React from 'react';
import { Link } from 'react-router-dom';
import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import Home from './home/home';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
// import theGramLogo from '../../../assets/images/the-gram-logo.png'
import LoginForm from './session/login_form_hook'

export default function App() {


    return (
        <div>

            <Link to="/signup">Sign Up</Link>
            <br/>
            <Link to="/login">Login</Link>
            <hr/>
            {/* <img className="main-logo" src={theGramLogo} alt=""/> */}

            <ProtectedRoute exact path="/" component={Home} />
            <AuthRoute exact path="/signup" component={SignupContainer} />
            {/* <AuthRoute exact path="/login" component={LoginContainer} /> */}
            <AuthRoute exact path="/login" component={LoginForm} />

        </div>
    );
}
