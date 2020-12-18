import React from 'react';
import Post from './post';

export default function Feed({ posts }) {
    return (
        <ul className="feed">
            {posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </ul>
    );
}

const LoadingComponent = () => <div>Loading...</div>;

// if (!posts.length) {
//     let retrievedObject = localStorage.getItem('developmentPosts');
//     posts = Object.values(JSON.parse(retrievedObject))
//     // console.log('retrievedObject: ', JSON.parse(retrievedObject));
// }