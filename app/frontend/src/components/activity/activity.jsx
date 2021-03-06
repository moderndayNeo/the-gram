import React, { useEffect, useState } from 'react';
import BottomNav from '../shared/bottom_nav';
import stateSelectors from '../../util/state_selectors';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotifications } from '../../redux/actions/notification_actions';
import LoadingPlaceholder from '../shared/loading_placeholder';
import UserAvatar from '../shared/user_avatar';
import DynamicFollowButton from '../shared/dynamic_follow_button';
import ActivityPlaceholder from './activity_placeholder';

import { modifyTime } from '../../util/helpers';
import { Link } from 'react-router-dom';

export default function Activity() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const notifications = useSelector(stateSelectors.allNotifications());

    useEffect(() => {
        if (!notifications.length)
            setLoading(true);
        dispatch(fetchNotifications())
            .then(() => setLoading(false));
    }, []);

    return (
        <div className="activity">
            <header><h3>Activity</h3></header>
            {
                loading ? <LoadingPlaceholder /> :
                    notifications.length > 0 ?
                        <Notifications notifications={notifications} /> :
                        <ActivityPlaceholder />
            }
            <BottomNav />
        </div>
    );
}

const Notifications = ({ notifications }) => (
    <ul className="notifications-list">
        {
            notifications.map(notification => (
                <div className="notification-container" key={notification.id}>
                    <Notification notification={notification} />
                    <div className="border-line" />
                </div>
            ))
        }
    </ul>
);

const Notification = ({ notification }) => {
    const sourceUser = useSelector(stateSelectors.userById(notification.source_user_id));

    const content = () => {
        switch (notification.notifiable_type) {
            case "Like":
                return <Link to={`/posts/${notification.source_post_id}`}>
                    <LikeNotification notification={notification} sourceUser={sourceUser} />
                </Link>;
            case "Follow":
                return <Link to={`/users/${sourceUser.id}`}>
                    <FollowNotification notification={notification} sourceUser={sourceUser} />
                </Link>;
        }
    };

    return content();
};

const FollowNotification = ({ notification, sourceUser }) => {

    return (
        <li
            className="notification follow-notification"
        >
            <UserAvatar imageUrl={sourceUser.image_url} />
            <div className="details">
                <p className="username-link" id="follow-notification-username">{sourceUser.username}</p>
                <p> {notification.message}.</p>
                <p className="time-ago">{modifyTime(notification.time_ago)}</p>
            </div>
            <DynamicFollowButton
                userId={sourceUser.id}
            />
        </li>
    );

};

const LikeNotification = ({ notification, sourceUser }) => {
    const post = useSelector(stateSelectors.postById(notification.source_post_id));

    return (
        <li className="notification like-notification">
            <UserAvatar imageUrl={sourceUser.image_url} />
            <div className="details">
                <p className="username-link">{sourceUser.username}</p>
                <p> {notification.message}.</p>
                <p className="time-ago">{modifyTime(notification.time_ago)}</p>
            </div>

            <SquarePostImage
                imageUrl={post.image_url}

            />
        </li>
    );

};

const SquarePostImage = ({ imageUrl }) => <img src={imageUrl} alt="post" className="square-post-image" />;

