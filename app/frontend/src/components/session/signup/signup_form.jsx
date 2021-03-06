import React, { useState } from 'react';
import { createNewUser } from '../../../redux/actions/session_actions';
import { useDispatch } from 'react-redux';

export default function SignupForm() {
    const dispatch = useDispatch();
    const [info, setInfo] = useState({
        name: '',
        username: '',
        bio: '',
        password: '',
        email: ''
    });

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(createNewUser(info));
    };

    const updateValue = type => {
        return e => {
            type === 'username' ?
                setInfo({ ...info, [type]: e.currentTarget.value.toLowerCase() }) :
                setInfo({ ...info, [type]: e.currentTarget.value });
        };
    };

    const allFieldsFilled = () => (
        ['name', 'username', 'email'].every(field => info[field]) && info.password.length >= 6
    );


    return (
        <form className="auth-form signup-form">
            <input className="grey-input" type="text" autoComplete="off" value={info.email} placeholder="Email" onChange={updateValue("email")} />
            <br />
            <input className="grey-input" type="text" autoComplete="off" value={info.name} placeholder="Full Name" onChange={updateValue("name")} />
            <br />
            <input className="grey-input" type="text" autoComplete="off" value={info.username} placeholder="Username" onChange={updateValue("username")} />
            <br />
            <input className="grey-input" type="password" autoComplete="off" value={info.password} placeholder="Password" onChange={updateValue("password")} />
            <br />
            <button disabled={allFieldsFilled() ? false : true} className="blue-button" onClick={(e) => handleSubmit(e)}>Sign Up</button>
        </form>
    );
}
