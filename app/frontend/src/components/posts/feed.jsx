import React from 'react';
import Post from './post';

export default function Feed({ posts }) {

    return (
        <ul className="feed">
            {posts.map(post => (
                <Post key={post.id} post={post} />
            ))
            }
        </ul>
    );
}