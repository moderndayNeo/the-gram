import React, { useState } from 'react';
import { createNewUser } from '../../../redux/actions/session_actions';

export default function LoginForm() {
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
            setInfo({ ...info, [type]: e.currentTarget.value });
        };
    };

    return (
        <div>
            <form>
                <input type="text" value={info.username} placeholder="username" onChange={updateValue("username")} />
                <br />
                <input type="text" value={info.name} placeholder="name" onChange={updateValue("name")} />
                <br />
                <input type="password" value={info.password} placeholder="password" onChange={updateValue("password")} />
                <br />
                <input type="text" value={info.email} placeholder="email" onChange={updateValue("email")} />
                <br />
                <input type="text" value={info.bio} placeholder="bio" onChange={updateValue("bio")} />
                <br />
                <input type="submit" onClick={(e) => handleSubmit(e)} value="Login" />
            </form>
        </div>
    );
}
