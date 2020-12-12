import React from 'react'
import AppLinks from '../../shared/app_links';
import LoginForm from './login_form'
import MainLogo from '../../shared/main_logo'
import SignupLoginLink from '../../shared/signup_login_link'

export default function LoginPage() {
    return (
        <div className="auth-page login-page">
            <MainLogo />
            <LoginForm />
            <SignupLoginLink text="Don't have an account?" linkText="Sign up" href="/signup" />
            <AppLinks />
        </div>
    )
}
