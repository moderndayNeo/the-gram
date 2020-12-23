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
                                <div className="notification-container" key={notification.id}>
                                    <Notification notification={notification} />
                                    <div className="border-line" />
                                </div>
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
                <p className="username-link">{sourceUser.username}</p>
                <div className="info">
                    <p>{notification.message}.</p>
                    <p className="time-ago">12h</p>
                    {/* <p className="time-ago">{notification.time_ago}</p> */}
                </div>
            </div>
            {
                isFollowing ?
                    <FollowButton userId={sourceUser.id} /> : <FollowingButton userId={sourceUser.id} />
            }
        </li>
    );
};

