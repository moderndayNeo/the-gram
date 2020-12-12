import React from 'react';
import SignupForm from './signup_form';
import MainLogo from '../../shared/main_logo';
import SignupTerms from './signup-terms';
import AppLinks from '../../shared/app_links';
import GuestLoginButton from '../../shared/guest-login-button';
import SignupLoginLink from '../../shared/signup_login_link';
import OrSeparator from '../../shared/or_separator';
import UnfilledHeartIcon from './icons/unfilled-heart-icon.jsx';
import UnfilledHomeIcon from './icons/unfilled-home-icon'
import UnfilledCompassIcon from './icons/unfilled-compass-icon'
import UnfilledNewPostIcon from './icons/unfilled-new-post-icon'
import UnfilledCameraIcon from './icons/unfilled-camera-icon'
import UnfilledPaperPlaneIcon from './icons/unfilled-paper-plane-icon'
import UnfilledCommentIcon from './icons/unfilled-comment-icon'
import UnfilledSaveIcon from './icons/unfilled-save-icon'
import Chevron from './icons/chevron'
import ThreeDotsIcon from './icons/three-dots-icon'
import FilledHomeIcon from './icons/filled-home-icon'
import FilledExploreIcon from './icons/filled-explore-icon'
import FilledHeartIcon from './icons/filled-heart-icon'
import FilledSaveIcon from './icons/filled-save-icon'
import NewMessageIcon from './icons/new-message-icon'
import RedHeartIcon from './icons/red-heart-icon'

export default function SignupPage() {
    return (
        <div className="auth-page signup-page">
            <MainLogo />
            <p className="subtext">Sign up to see photos and videos from your friends.</p>
            <GuestLoginButton />
            <OrSeparator />
            <SignupForm />
            <SignupTerms />
            <SignupLoginLink text="Have an account?" linkText="Log in" href="/login" />
            <UnfilledHeartIcon />
            <UnfilledHomeIcon />
            <UnfilledCompassIcon />
            <UnfilledNewPostIcon />
            <UnfilledCameraIcon />
            <UnfilledPaperPlaneIcon />
            <UnfilledCommentIcon /> 
            <UnfilledSaveIcon />
            <Chevron />
            <ThreeDotsIcon />
            <FilledHomeIcon />
            <FilledExploreIcon />
            <FilledHeartIcon />
            <FilledSaveIcon />
            <NewMessageIcon />
            <RedHeartIcon />
            <AppLinks />
        </div>
    );
}
