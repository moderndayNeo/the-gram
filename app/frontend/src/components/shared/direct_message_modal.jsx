import React from 'react';
import { useDispatch } from 'react-redux';
import { hideDirectMessageModal } from '../../redux/actions/ui_actions';

export default function DirectMessageModal() {
    const dispatch = useDispatch();

    return (
        <div className="dm-modal modal-container">
            <div className="overlay">
                <div className="modal">
                    <button
                        className="modal-message"
                    >
                        <p>
                            <strong>
                                Direct Messaging
                        </strong>
                        is not yet a feature of The Gram.
                        </p>
                    </button>
                    <button
                        className="continue-button"
                        onClick={() => dispatch(hideDirectMessageModal())}
                    >Continue</button>
                </div>
            </div>
        </div>
    );
}
