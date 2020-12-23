import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Feed from '../posts/feed';
import HomeTopNav from './home_top_nav';
import BottomNav from '../shared/bottom_nav';
import { getFeed } from '../../redux/actions/post_actions';
import stateSelectors from '../../util/state_selectors';
import LoadingPlaceholder from '../shared/loading_placeholder';
import PostModal from '../posts/post_modal';

export default function Home() {
    const dispatch = useDispatch();
    let posts = useSelector(stateSelectors.allPosts());
    const [postModalDisplayed, setPostModalDisplayed] = useState(false);
    const [postModalId, setPostModalId] = useState(null)

    if (!posts.length) {
        dispatch(getFeed());
    }

    const displayPostModal = (postId) => {
        setPostModalDisplayed(true)
        setPostModalId(postId)
    }

    return (
            <section className="home">
            <HomeTopNav />
            {
                posts.length ?
                    <Feed posts={posts} displayPostModal={displayPostModal} /> :
                    <LoadingPlaceholder />
            }
            <BottomNav />
            {postModalDisplayed && <PostModal setPostModalDisplayed={setPostModalDisplayed} postId={postModalId} />}
        </section>
    );
}