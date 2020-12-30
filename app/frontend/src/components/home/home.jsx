import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Feed from '../posts/feed';
import HomeTopNav from './home_top_nav';
import BottomNav from '../shared/bottom_nav';
import { getFeed } from '../../redux/actions/post_actions';
import stateSelectors from '../../util/state_selectors';
import LoadingPlaceholder from '../shared/loading_placeholder';

export default function Home() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    let posts = useSelector(stateSelectors.allPosts());

    // if (!posts.length) {
    // dispatch(getFeed());
    // }

    React.useEffect(() => {
        setLoading(true);
        dispatch(getFeed())
            .then(() => setLoading(false));
    }, []);

    return loading ? <LoadingPlaceholder /> :
        <section className="home">
            <HomeTopNav />
            {
                posts.length ?
                    <Feed posts={posts} /> :
                    <LoadingPlaceholder />
            }
            <BottomNav />
        </section>;

}
