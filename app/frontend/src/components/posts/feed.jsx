import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFeed } from '../../redux/actions/post_actions';
import Post from './post';
import stateSelectors from '../../util/state_selectors';

export default function Feed() {
    const dispatch = useDispatch();
    let users = useSelector(stateSelectors.allUsers());
    let posts = useSelector(stateSelectors.allPosts());
    const [loading, setLoading] = useState(false);
    // if (!posts.length) {
    //     let retrievedObject = localStorage.getItem('developmentPosts');
    //     posts = Object.values(JSON.parse(retrievedObject))
    //     // console.log('retrievedObject: ', JSON.parse(retrievedObject));
    // }

    useEffect(() => {
        // setLoading(true);
        dispatch(getFeed());

        // setTimeout(() => {
        //     setLoading(false);
        // }, 1000);
    }, []);

    // useEffect(() => {
    //     setLoading(true);
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 1000);
    // }, [posts]);

    return (
        <ul className="feed">
            {
                loading ?
                    <LoadingComponent /> :
                    posts.map(post => (
                        <Post key={post.id} post={post} />
                    ))
            }
        </ul>
    );
}

const LoadingComponent = () => <div>Loading...</div>;