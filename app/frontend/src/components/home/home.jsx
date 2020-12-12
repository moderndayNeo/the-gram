import React from 'react';
import { useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/session_actions';
import { useDispatch } from 'react-redux';


export default function Home() {
    const dispatch = useDispatch();

    const currentUserId = useSelector(state => state.session.id);
    const currentUser = useSelector(state => state.entities.users[currentUserId]);
    const userImageUrl = currentUser.image_url;
    console.log(currentUser);

    return (
        <div>
            <h3>Welcome, {currentUser.name}!</h3>
            {
                userImageUrl &&
                <img src={userImageUrl} alt="user" />
            }
            <button onClick={() => dispatch(logoutUser())}>Log Out</button>
        </div>
    );
}