import React, { useState } from 'react';
import { loginUser } from '../../../redux/actions/session_actions';

export default function LoginForm() {
    const [info, setInfo] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(loginUser(info));
    };

    const updateValue = type => {
        return e => {
            setInfo({ ...info, [type]: e.currentTarget.value });
        };
    };

    return (
        <form className="auth-form">
            <input
                className="grey-input"
                type="text"
                value={info.username}
                placeholder="Username"
                onChange={updateValue("username")}
                autoComplete="username"
            />
            <br />
            <input
                className="grey-input"
                type="password"
                value={info.password}
                placeholder="Password"
                onChange={updateValue("password")}
                autoComplete="password"
            />
            <br />
            <button className="blue-button" onClick={(e) => handleSubmit(e)}>Log In</button>

        </form>
    );
}
