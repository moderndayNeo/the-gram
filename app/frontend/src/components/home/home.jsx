import React from 'react';
import { useSelector } from 'react-redux';

export default function Home() {
    const name = useSelector(state => state.session.name);
    const id = useSelector(state => state.session.id);

    return (
        <div>
            Home
            <h3>{name}</h3>
    <h3>{id}</h3>
        </div>
    );
}


/*
receiveCurrentUser action
- sessions reducer responds to it
- users reducer also responds to it, and stores the user info
*/