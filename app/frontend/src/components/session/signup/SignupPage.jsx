import React from 'react';
import SignupForm from './signup_form_hook';
import MainLogo from '../../shared/main_logo';
import TermsAndConditions from './terms_and_conditions';

export default function SignupPage() {
    return (
        <div>
            <MainLogo />
            <p>Sign up to see photos and videos from your friends.</p>
            <SignupForm />

        <TermsAndConditions />


        </div>
    );
}
