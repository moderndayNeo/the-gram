import React from 'react';
import { hideCommentModal, showClipboardPopup } from '../../redux/actions/ui_actions';

export default function CommentModal({ postId }) {

    const handleCopy = () => {
        const path = (process.env.NODE_ENV === 'development') ?
            "http://localhost:3000/#/posts" :
            "https://adamjz-the-gram.herokuapp.com/#/posts";
        navigator.clipboard.writeText(`${path}/${postId}`);

        dispatch(hideCommentModal());
        dispatch(showClipboardPopup());
    };

    return (
        <div className="post-modal modal-container">
            <div className="overlay">
                <div className="modal">
                    <button
                        onClick={() => handleCopy()}
                    >Copy Link</button>
                    <button
                        className="cancel-button"
                        onClick={() => dispatch(hideCommentModal())}
                    >Cancel</button>
                </div>
            </div>
        </div>
    );
}
