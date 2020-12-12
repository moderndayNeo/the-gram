import React from 'react'
import AppLinks from '../../shared/app_links';
import LoginForm from './login_form'
import MainLogo from '../../shared/main_logo'
import SignupLink from '../../shared/signup_link'

export default function LoginPage() {
    return (
        <div className="auth-page login-page">
            <MainLogo />
            <LoginForm />

            <SignupLink />
            <AppLinks />
        </div>
    )
}
