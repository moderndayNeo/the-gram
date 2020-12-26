import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../redux/actions/post_actions';
import { hidePostModal } from '../../redux/actions/ui_actions';

export default function PostModal({ postId }) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deletePost(postId));
        dispatch(hidePostModal());
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
                        onClick={() => dispatch(hidePostModal())}
                    >Cancel</button>
                </div>
            </div>
        </div>
    );
}
