import React from 'react';
import { useSelector } from 'react-redux';


export default function AllPosts() {

    const posts = useSelector(state => Object.values(state.entities.posts));

    return (
        <ul>
            {
                posts.map(post => (
                    <li key={post.id}>
                        <p>Id: {post.id}</p>
                        <p>Caption: {post.caption}</p>
                    </li>
                ))
            }
        </ul>
    );
}
