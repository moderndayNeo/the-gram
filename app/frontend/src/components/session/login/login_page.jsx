import React from 'react';
import AppLinks from '../../shared/app_links';
import LoginForm from './login_form';
import MainLogo from '../../shared/main_logo';
import SignupLoginLink from '../../shared/signup_login_link';
import GuestLoginButton from '../../shared/guest-login-button';
import OrSeparator from '../../shared/or_separator';
import SessionErrors from '../../shared/session_errors'

export default function LoginPage() {
    return (
        <div className="auth-page login-page">
            <MainLogo />
            <LoginForm />
            <SessionErrors />
            <OrSeparator />
            <GuestLoginButton />
            <SignupLoginLink text="Don't have an account?" linkText="Sign up" href="/signup" />
            <AppLinks />
        </div>
    );
}
