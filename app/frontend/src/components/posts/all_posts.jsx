import React from 'react';
import { useSelector } from 'react-redux';

export default function AllPosts() {

    const posts = useSelector(state => Object.values(state.entities.posts));

    return (
        <div>
            {
                posts.map(post => (
                    <li key={post.id}>
                        <p>Id: {post.id}</p>
                        <p>Content: {post.content}</p>
                    </li>
                ))
            }
        </div>
    );
}
