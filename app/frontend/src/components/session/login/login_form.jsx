import React, { useState } from 'react';
import { loginUser } from '../../../redux/actions/session_actions';
import { useDispatch } from 'react-redux';

export default function LoginForm() {
    const dispatch = useDispatch();
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
        <form className="auth-form login-form">
            <input
                className="grey-input"
                type="text"
                value={info.username}
                placeholder="Username"
                onChange={updateValue("username")}
                autoComplete="off"
            />
            <br />
            <input
                className="grey-input"
                type="password"
                value={info.password}
                placeholder="Password"
                onChange={updateValue("password")}
                autoComplete="off"
            />
            <br />
            <button className="blue-button" onClick={(e) => handleSubmit(e)}>Log In</button>

        </form>
    );
}
