import React, { useState } from 'react';
import { createNewUser } from '../../../redux/actions/session_actions';

export default function SignupForm() {
    const [info, setInfo] = useState({
        name: 'guest4',
        username: 'guest4',
        bio: 'guest4',
        password: '',
        email: 'guest4'
    });

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(createNewUser(info));
    };

    const updateValue = type => {
        return e => {
            setInfo({ ...info, [type]: e.currentTarget.value });
        };
    };

    const allFieldsFilled = () => (
        ['name', 'username', 'email'].every(field => info[field]) && info.password.length >= 6
    );


    return (
        <form className="auth-form signup-form">
            <input className="grey-input" type="text" value={info.email} placeholder="Email" onChange={updateValue("email")} />
            <br />
            <input className="grey-input" type="text" value={info.name} placeholder="Full Name" onChange={updateValue("name")} />
            <br />
            <input className="grey-input" type="text" value={info.username} placeholder="Username" onChange={updateValue("username")} />
            <br />
            <input className="grey-input" type="password" value={info.password} placeholder="Password" onChange={updateValue("password")} />
            <br />
            <button disabled={allFieldsFilled() ? false : true} className="blue-button" onClick={(e) => handleSubmit(e)}>Sign Up</button>
        </form>
    );
}
