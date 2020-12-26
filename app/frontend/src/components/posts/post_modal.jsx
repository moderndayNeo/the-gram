import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../redux/actions/post_actions';
import { hidePostModal, showClipboardPopup } from '../../redux/actions/ui_actions';

export default function PostModal({ postId }) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deletePost(postId));
        dispatch(hidePostModal());
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(`http://localhost:3000/#/posts/${postId}`);
        // in PROD: use the heroku address
        dispatch(hidePostModal());
        dispatch(showClipboardPopup());
    };


    return (
        <div className="post-modal">
            <div className="overlay">
                <div className="modal">
                    <button
                        className="delete-button"
                        onClick={() => handleDelete()}
                    >Delete</button>
                    <button
                        onClick={() => handleCopy()}
                    >Copy Link</button>
                    <button
                        className="cancel-button"
                        onClick={() => dispatch(hidePostModal())}
                    >Cancel</button>
                </div>
            </div>
        </div>
    );
}
