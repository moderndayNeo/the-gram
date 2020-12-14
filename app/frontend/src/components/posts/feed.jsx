import React from 'react';
import { useSelector } from 'react-redux';
import Post from './post';


export default function Feed() {

    // const posts = useSelector(state => Object.values(state.entities.posts));
    const posts = [{ id: 1, author_id: 1, caption: 'Example post' }];

    return (
        <ul>
            {
                posts.map(post => (
                    <Post key={post.id} post={post} />
                ))
            }
        </ul>
    );
}

