import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/actions/session_actions';
import Feed from '../posts/feed';
import HomeTopNav from './home_top_nav';
import BottomNav from '../shared/bottom_nav';

export default function Home() {
    const dispatch = useDispatch();

    return (
        <section className="home">
            <HomeTopNav />
            <button onClick={() => dispatch(logoutUser())}>Log Out</button>
            <Feed />
            <BottomNav />
        </section>
    );
}


const loadingComponent = () => <div>Loading...</div>;