import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFeed } from '../../redux/actions/post_actions';
import Post from './post';
import stateSelectors from '../../util/state_selectors';

export default function Feed() {
    const dispatch = useDispatch();
    let users = useSelector(stateSelectors.allUsers());
    let posts = useSelector(stateSelectors.allPosts());
    // if (!posts.length) {
    //     let retrievedObject = localStorage.getItem('developmentPosts');
    //     posts = Object.values(JSON.parse(retrievedObject))
    //     // console.log('retrievedObject: ', JSON.parse(retrievedObject));
    // }


    useEffect(() => {
        dispatch(getFeed());
    }, []);

    return (
        <ul className="feed">
            {
                users.length > 1 ?
                    posts.map(post => (
                        <Post key={post.id} post={post} />
                    )) : <div>Loading...</div>
            }
        </ul>
    );
}

