import React from 'react';

export default function PostModal({setPostModalDisplayed}) {
    console.log('post modal displayed');

    return (
        <div className="post-modal">
            <div className="overlay">
                <div className="modal">
                    <button className="delete-button">Delete</button>
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
