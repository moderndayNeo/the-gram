import React, { useEffect } from 'react';
import BottomNav from '../shared/bottom_nav';
import stateSelectors from '../../util/state_selectors';
import { useSelector, useDispatch } from 'react-redux';
import { getFeed } from '../../redux/actions/post_actions';
import LoadingPlaceholder from '../shared/loading_placeholder';
import UserAvatar from '../shared/user_avatar';
import FollowButton from '../shared/follow_button';
import FollowingButton from '../shared/following_button';

export default function Activity() {
    const dispatch = useDispatch();
    const notifications = useSelector(stateSelectors.allNotifications());

    useEffect(() => {
        if (!notifications.length)
            dispatch(getFeed());
    }, []);

    return (
        <div className="activity">
            <header><h3>Activity</h3></header>

            {
                !notifications.length ?
                    <LoadingPlaceholder /> :
                    <ul>
                        {
                            notifications.map(notification => (
                                <Notification key={notification.id} notification={notification} />
                            ))
                        }
                    </ul>
            }

            <BottomNav />
        </div>
    );
}

const Notification = ({ notification }) => {
    const sourceUser = useSelector(stateSelectors.userById(notification.source_user_id));
    const isFollowing = useSelector(stateSelectors.currentUserIsFollowing(notification.source_user_id));

    return (
        <li className="notification">
            <UserAvatar imageUrl={sourceUser.image_url} />
            <div className="details">
                <p>{sourceUser.username}</p>
                <p>{notification.message}</p>
                <p>{notification.time_ago}</p>
            </div>
            {
                isFollowing ?
                    <FollowButton /> : <FollowingButton />
            }
        </li>
    );
};

// if current user is following user 4, id 4 is in current users followed user ids 