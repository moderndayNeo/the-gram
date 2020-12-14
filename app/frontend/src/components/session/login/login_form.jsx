import React, { useState } from 'react';
import { loginUser } from '../../../redux/actions/session_actions';
// import { useHistory } from 'react-router-dom';

export default function LoginForm() {
    // const history = useHistory();
    const [info, setInfo] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(loginUser(info));
        // .then(() => history.push('/'));
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
