import React from 'react';
import { useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/session_actions';
import { useDispatch } from 'react-redux';
import ImageForm from '../user/image_form';


export default function Home() {
    const dispatch = useDispatch();

    const currentUserId = useSelector(state => state.session.id);
    const currentUser = useSelector(state => state.entities.users[currentUserId]);
    const userImageUrl = currentUser.image_url;

    const currentUserShowPage = () => <div>
        <button onClick={() => dispatch(logoutUser())}>Log Out</button>
        <h3>Welcome, {currentUser.name}!</h3>
        {
            userImageUrl &&
            <img src={userImageUrl} alt="user" />
        }

        <ImageForm currentUserId={currentUserId} />
    </div>;

    const loadingComponent = () => <div>Loading...</div>;

    return (
        currentUser ? currentUserShowPage() : loadingComponent()
    );
}