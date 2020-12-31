import React from 'react';
import icons from '../shared/icons/svg-icons'

export default function ActivityPlaceholder() {
    return (
        <div className="activity-placeholder">
            <div className="icon">{icons.unfilledHeart}</div>
            <h2 className="title">Activity On Your Posts</h2>
            <p>When someone follows you or likes one of your posts, you'll see it here</p>
        </div>
    );
}
