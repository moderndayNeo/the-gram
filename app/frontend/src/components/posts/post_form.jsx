import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/actions/post_actions';

export default function PostForm() {
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({
        caption: ''
    });

    const updateValue = type => {
        return e => {
            setPostData({
                ...postData,
                [type]: e.currentTarget.Value
            }
            );
        };
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(createPost(postData));
    };


    return (
        <form>
            <input
                type="text"
                placeholder="Caption"
                onChange={() => updateValue('caption')}
            />

            <button
                // disabled={postData.caption.length > 0 ? false : true}
                onClick={(e) => handleSubmit(e)}>
                Upload post
                 </button>
        </form>);
}
