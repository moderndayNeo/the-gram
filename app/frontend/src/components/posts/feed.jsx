import React from 'react';
import { useSelector } from 'react-redux';
import Post from './post';

export default function Feed() {

    // const posts = useSelector(state => Object.values(state.entities.posts));
    const posts = [{ id: 1, author_id: 1, caption: 'Example post', author_username: 'arnie85', image_url: window.waterfallImg }];

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

