import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../redux/actions/post_actions';

export default function PostModal({ setPostModalDisplayed, postId }) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deletePost(postId));
        setPostModalDisplayed(false);
    };

    return (
        <div className="post-modal">
            <div className="overlay">
                <div className="modal">
                    <button
                        className="delete-button"
                        onClick={() => handleDelete()}
                    >Delete</button>
                    <button>Copy Link</button>
                    <button
                        className="cancel-button"
                        onClick={() => setPostModalDisplayed(false)}
                    >Cancel</button>
                </div>
            </div>
        </div>
    );
}
