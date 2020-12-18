import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFeed } from '../../redux/actions/post_actions';
import Post from './post';
import stateSelectors from '../../util/state_selectors';

export default function Feed({posts}) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    // if (!posts.length) {
    //     let retrievedObject = localStorage.getItem('developmentPosts');
    //     posts = Object.values(JSON.parse(retrievedObject))
    //     // console.log('retrievedObject: ', JSON.parse(retrievedObject));
    // }

    return (
        <ul className="feed">
            {
                loading ?
                    <LoadingComponent /> :
                    posts.map(post => (
                        <Post key={post.id} post={post} />
                    ))
            }
        </ul>
    );
}

const LoadingComponent = () => <div>Loading...</div>;