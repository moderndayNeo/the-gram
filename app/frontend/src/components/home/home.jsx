import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/actions/session_actions';
import Feed from '../posts/feed';
import HomeTopNav from './home_top_nav';
import BottomNav from '../shared/bottom_nav';

export default function Home() {
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.session.id);
    const currentUser = useSelector(state => state.entities.users[currentUserId]);

    return (
        <section>
            <HomeTopNav />
            <button onClick={() => dispatch(logoutUser())}>Log Out</button>
            <Feed />
            <BottomNav currentUser={currentUser} />
        </section>
    );
}


const loadingComponent = () => <div>Loading...</div>;