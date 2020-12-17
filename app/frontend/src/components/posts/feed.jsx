import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFeed } from '../../redux/actions/post_actions';
import Post from './post';

export default function Feed() {
    const dispatch = useDispatch();

    let users = useSelector(state => Object.values(state.entities.users))
    let posts = useSelector(state => Object.values(state.entities.posts));
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
            Feed
            {
                users.length > 1 ?
                    posts.map(post => (
                        <Post key={post.id} post={post} />
                    )) : <div>Loading...</div>
            }
        </ul>
    );
}

