import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Feed from '../posts/feed';
import HomeTopNav from './home_top_nav';
import BottomNav from '../shared/bottom_nav';
import { getFeed, getNewUserFeed } from '../../redux/actions/post_actions';
import stateSelectors from '../../util/state_selectors';
import LoadingPlaceholder from '../shared/loading_placeholder';
import NewUserHomepage from './new_user_homepage';

export default function Home() {
    const dispatch = useDispatch();
    let posts = useSelector(stateSelectors.allPosts());
    let followedUserIds = useSelector(stateSelectors.followedUserIds());
    const notFollowingAnyone = followedUserIds.length === 0;

    React.useEffect(() => {
        if (!notFollowingAnyone && !posts.length) dispatch(getFeed());
    }, []);

    React.useEffect(() => {
        dispatch(getFeed());
    }, [notFollowingAnyone]);

    return (
        <section className="home">
            <HomeTopNav />
            {
                notFollowingAnyone ?
                    <NewUserHomepage /> :
                    posts.length === 0 ?
                        <LoadingPlaceholder spinner={true} /> :
                        <Feed posts={posts} />
            }
            <BottomNav />
        </section>
    );
}