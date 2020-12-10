import React, { useState } from 'react';

export default function LoginForm() {
    const [info, setInfo] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = e => {

    };

    const updateValue = type => {
        return e => {
            setInfo({ ...info, [type]: e.currentTarget.value })
        }
    };


    return (
        <div>
            <form>
                <input type="text" value={info.username} placeholder="username" onChange={updateValue("username")} />
                <br />
                <input type="password" value={info.password} placeholder="password" onChange={updateValue("password")} />
                <br />
                <input type="submit" onClick={(e) => handleSubmit(e)} value="Login" />
            </form>
        </div>
    );
}
