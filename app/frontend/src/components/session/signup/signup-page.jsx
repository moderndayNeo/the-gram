import React from 'react';
import SignupForm from './signup_form';
import MainLogo from '../../shared/main_logo';
import SignupTerms from './signup-terms'
import LoginLink from '../../shared/login_link';

export default function SignupPage() {
    return (
        <div className="signup-page">
            <MainLogo />
            <p className="subtext">Sign up to see photos and videos from your friends.</p>
            <SignupForm />
            <SignupTerms />
            <LoginLink />
        </div>
    );
}
