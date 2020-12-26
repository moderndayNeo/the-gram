import React from 'react';
import icons from '../shared/icons/svg-icons';
import { useHistory, Link } from 'react-router-dom';
import DynamicFollowButton from '../shared/dynamic_follow_button';
import stateSelectors from '../../util/state_selectors';
import { useSelector } from 'react-redux';
import BottomNav from '../shared/bottom_nav';
import UserAvatar from '../shared/user_avatar';

export default function Following() {
    const history = useHistory();
    const allFollowedUsers = useSelector(stateSelectors.allFollowedUsers());

    return (
        <div className="followers-and-following">
            <header>
                <div onClick={() => history.goBack()}>
                    {icons.chevron}
                </div>
                <h3>Following</h3>
                <div></div>
            </header>
            <ul className="user-list">
                {
                    allFollowedUsers.map(user => (
                        <UserLink key={user.id} user={user} />
                    ))
                }
            </ul>
            <BottomNav />
        </div>
    );
}

const UserLink = ({ user }) => {
    return (
        <li className="user">
            <div className="container">
                <Link to={`/users/${user.id}`}>
                    <div className="image-and-text">
                        <UserAvatar imageUrl={user.image_url} />
                        <div className="text">
                            <p className="username-link">{user.username}</p>
                            <p className="text-after-username">{user.bio}</p>
                        </div>
                    </div>
                </Link>
                <DynamicFollowButton userId={user.id} />
            </div>
        </li>
    );
};