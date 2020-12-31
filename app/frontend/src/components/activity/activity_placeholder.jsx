import React from 'react';
import icons from '../shared/icons/svg-icons';
import SuggestedUsersList from '../shared/suggested_users_list';

export default function ActivityPlaceholder() {
    return (
        <div className="activity-placeholder">
            <article>
                <div className="icon">{icons.unfilledHeart}</div>
                <h2 className="title">Activity On Your Posts</h2>
                <p>When someone follows you or likes one of your posts, you'll see it here</p>
            </article>

            <h3 className="suggested-users-title">Suggestions For You</h3>
            <SuggestedUsersList />
        </div>
    );
}
