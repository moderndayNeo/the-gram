import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Feed from '../posts/feed';
import HomeTopNav from './home_top_nav';
import BottomNav from '../shared/bottom_nav';
import { getFeed, getNewUserFeed } from '../../redux/actions/post_actions';
import stateSelectors from '../../util/state_selectors';
import LoadingPlaceholder from '../shared/loading_placeholder';

export default function Home() {
    const dispatch = useDispatch();
    let posts = useSelector(stateSelectors.allPosts());

    React.useEffect(() => {
        if (!posts.length) {
            dispatch(getFeed())
                .then(() => {
                    if (!posts.length) {
                        dispatch(getNewUserFeed());
                    }
                });
        }
    }, []);

    return (
        <section className="home">
            <HomeTopNav />
            {
                posts.length > 0 ?
                    <Feed posts={posts} /> :
                    <LoadingPlaceholder spinner={true} />
            }
            <BottomNav />
        </section>
    );
}

