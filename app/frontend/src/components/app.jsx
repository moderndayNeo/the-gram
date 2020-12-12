import React from 'react';
import Home from './home/home';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import LoginForm from './session/login_form';
import SignupPage from './session/signup/signup-page';

export default function App() {

    return (
        <div className="app">
            <ProtectedRoute exact path="/" component={Home} />
            <AuthRoute exact path="/signup" component={SignupPage} />
            <AuthRoute exact path="/login" component={LoginForm} />
        </div>
    );
}

