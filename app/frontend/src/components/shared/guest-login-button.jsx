import React from 'react';
import { loginUser } from '../../redux/actions/session_actions';
import { useDispatch } from 'react-redux';

export default function GuestLoginButton() {
    const dispatch = useDispatch();

    const loginGuest = () => (
        dispatch(loginUser({
            username: 'guest',
            password: 'guestaccount'
        }))
    );

    return (
        <button
            className="blue-button"
            onClick={() => loginGuest()}
        >
            Continue as guest
        </button>
    );
}
