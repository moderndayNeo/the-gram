import React from 'react';
import { useSelector } from 'react-redux';
import Post from './post';

export default function Feed() {

    let posts = useSelector(state => Object.values(state.entities.posts));
    if (!posts.length) {
        let retrievedObject = localStorage.getItem('developmentPosts');
        posts = Object.values(JSON.parse(retrievedObject))
        // console.log('retrievedObject: ', JSON.parse(retrievedObject));
    }

    return (
        <ul className="feed">
            {
                posts.map(post => (
                    <Post key={post.id} post={post} />
                ))
            }
        </ul>
    );
}

