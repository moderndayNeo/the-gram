import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../redux/actions/post_actions';
import { hidePostModal, showClipboardPopup } from '../../redux/actions/ui_actions';
import { useHistory } from 'react-router-dom';
import stateSelectors from '../../util/state_selectors';

export default function PostModal() {
    const postId = useSelector(stateSelectors.postModalId());
    const dispatch = useDispatch();
    const history = useHistory();

    if (!postId) history.push('/');

    const handleDelete = () => {
        dispatch(deletePost(postId));
    };

    const handleCopy = () => {
        const path = (process.env.NODE_ENV === 'development') ?
            "http://localhost:3000/#/posts" :
            "https://adamjz-the-gram.herokuapp.com/#/posts";
        navigator.clipboard.writeText(`${path}/${postId}`);

        dispatch(hidePostModal());
        dispatch(showClipboardPopup());
    };

    return (
        <div className="post-modal modal-container">
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



