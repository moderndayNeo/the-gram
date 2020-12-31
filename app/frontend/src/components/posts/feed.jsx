import React from 'react';
import Post from './post';

export default function Feed({ posts }) {
    console.log('feed posts:', posts);
    return (
        <ul className="feed">
            {posts ? posts.map(post => (
                <Post key={post.id} post={post} />
            )) : <p>No posts</p>
        }
        </ul>
    );
}

// if some posts undefined, setLoading true, get feed, setLoading false
