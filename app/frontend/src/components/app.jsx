import React from 'react';
import Home from './home/home';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import LoginPage from './session/login/login_page';
import SignupPage from './session/signup/signup-page';
import PostStyle from './posts/post_creation/post_style';
import PostDetails from './posts/post_creation/post_details';
import Profile from './profile/profile';
import Explore from './explore/explore';
import Activity from './activity/activity';
import PostShow from './posts/post_show';

export default function App() {
    return (
        <div className="app">
            <AuthRoute exact path="/signup" component={SignupPage} />
            <AuthRoute exact path="/login" component={LoginPage} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/posts/:postId" component={PostShow} />
            <ProtectedRoute exact path="/explore" component={Explore} />
            <ProtectedRoute exact path="/accounts/activity" component={Activity} />
            <ProtectedRoute exact path="/create/style" component={PostStyle} />
            <ProtectedRoute exact path="/create/details" component={PostDetails} />
            <ProtectedRoute exact path="/users/:userId" component={Profile} />
        </div>
    );
}

