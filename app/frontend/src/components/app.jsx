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
import CommentsPage from './posts/comments_page';
import Followers from './profile/followers';
import Following from './profile/following';
import Suggested from './profile/suggested';
import PostModal from './posts/post_modal';
import stateSelectors from '../util/state_selectors';
import { useSelector } from 'react-redux';
import DirectMessageModal from './shared/direct_message_modal';
import EditProfile from './profile/edit_profile';
import ChangePassword from './profile/change_password';
import DesktopModal from './shared/desktop_modal';
import LoadingPlaceholder from './shared/loading_placeholder';

export default function App() {
    const postModalId = useSelector(stateSelectors.postModalId());
    const dmModal = useSelector(stateSelectors.dmModal());

    return (
        <div className={`app ${dmModal || postModalId && "position-fixed"}`}>
            <AuthRoute exact path="/signup" component={SignupPage} />
            <AuthRoute exact path="/login" component={LoginPage} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/posts/:postId" component={PostShow} />
            <ProtectedRoute exact path="/posts/:postId/comments" component={CommentsPage} />
            <ProtectedRoute exact path="/explore" component={Explore} />
            <ProtectedRoute exact path="/explore/people/suggested" component={Suggested} />
            <ProtectedRoute exact path="/accounts/edit" component={EditProfile} />
            <ProtectedRoute exact path="/accounts/activity" component={Activity} />
            <ProtectedRoute exact path="/accounts/password/change" component={ChangePassword} />
            <ProtectedRoute exact path="/create/style" component={PostStyle} />
            <ProtectedRoute exact path="/create/details" component={PostDetails} />
            <ProtectedRoute exact path="/users/:userId" component={Profile} />
            <ProtectedRoute exact path="/users/:userId/followers" component={Followers} />
            <ProtectedRoute exact path="/users/:userId/following" component={Following} />
            {postModalId && <PostModal postId={postModalId} />}
            {dmModal && <DirectMessageModal />}
            <DesktopModal />
            {/* <LoadingPlaceholder spinner={true} /> */}
        </div>
    );
}