import React from 'react';
import { useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/session_actions'
import { useDispatch } from 'react-redux';


export default function Home() {
    const dispatch = useDispatch();

    const name = useSelector(state => state.session.name)
    const id = useSelector(state => state.session.id)

    return (
        <div>
            <h3>Welcome, {name}!</h3>
            <button onClick={() => dispatch(logoutUser())}>Log Out</button>
        </div>
    );
}
