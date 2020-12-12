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
            <AppLinks />
        </div>
    );
}
