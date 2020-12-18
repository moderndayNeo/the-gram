import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/session_actions';
import Feed from '../posts/feed';
import HomeTopNav from './home_top_nav';
import BottomNav from '../shared/bottom_nav';
import {getFeed} from '../../redux/actions/post_actions'
import stateSelectors from '../../util/state_selectors'

export default function Home() {
    const dispatch = useDispatch();
    let posts = useSelector(stateSelectors.allPosts());
    if (!posts.length) dispatch(getFeed())

    return (
        <section className="home">
            <HomeTopNav />
            <button onClick={() => dispatch(logoutUser())}>Log Out</button>
            <Feed posts={posts} />
            <BottomNav />
        </section>
    );
}

const loadingComponent = () => <div>Loading...</div>