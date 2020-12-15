import React from 'react';
import Home from './home/home';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import LoginPage from './session/login/login_page'
import SignupPage from './session/signup/signup-page';
import PostStyle from './posts/post_creation/post_style'

export default function App() {

    return (
        <div className="app">
            <AuthRoute exact path="/signup" component={SignupPage} />
            <AuthRoute exact path="/login" component={LoginPage} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/create/style" component={PostStyle} />
        </div>
    );
}

