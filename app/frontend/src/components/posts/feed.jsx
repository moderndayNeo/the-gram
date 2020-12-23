import React from 'react';
import Post from './post';

export default function Feed({ posts, displayPostModal }) {
    return (
        <ul className="feed">
            {posts.map(post => (
                <Post key={post.id} post={post} displayPostModal={displayPostModal} />
            ))}
        </ul>
    );
}


// if (!posts.length) {
//     let retrievedObject = localStorage.getItem('developmentPosts');
//     posts = Object.values(JSON.parse(retrievedObject))
//     // console.log('retrievedObject: ', JSON.parse(retrievedObject));
// }