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

    const imageOrButton = () => {
        switch (notification.notifiable_type) {
            case "Like":
                const post = useSelector(stateSelectors.postById(notification.source_post_id));
                return <SquarePostImage imageUrl={post.image_url} />;
            case "Follow":
                return isFollowing ?
                    <FollowButton userId={sourceUser.id} /> : <FollowingButton userId={sourceUser.id} />;
            default:
                return <FollowButton userId={sourceUser.id} />;
        }
    };

    return (
        <li className="notification">
            <UserAvatar imageUrl={sourceUser.image_url} />
            <div className="details">
                <p className="username-link">{sourceUser.username}</p>
                <p> {notification.message}.</p>
                <p className="time-ago"> 12h</p>
                {/* <p className="time-ago">{notification.time_ago}</p> */}
            </div>
            {imageOrButton()}
        </li>
    );
};

const SquarePostImage = ({ imageUrl }) => <img src={imageUrl} alt="post" className="square-post-image" />;

