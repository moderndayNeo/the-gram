import React from 'react';
import icons from '../shared/icons/svg-icons'

export default function ActivityPlaceholder() {
    return (
        <div className="activity-placeholder">
            <div>{icons.unfilledHeart}</div>
            <h3>Activity On Your Posts</h3>
            <p>When someone follows you or likes one of your posts, you'll see it here</p>
        </div>
    );
}
