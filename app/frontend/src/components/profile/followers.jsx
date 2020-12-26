import React, { useEffect } from 'react';
import icons from '../shared/icons/svg-icons';
import { useHistory, Link } from 'react-router-dom';
import DynamicFollowButton from '../shared/dynamic_follow_button';
import { fetchFollowers } from '../../redux/actions/user_actions';
import stateSelectors from '../../util/state_selectors';
import { useSelector, useDispatch } from 'react-redux';
import BottomNav from '../shared/bottom_nav';
import UserAvatar from '../shared/user_avatar';

export default function Followers() {
    const history = useHistory();
    const dispatch = useDispatch();
    const allFollowers = useSelector(stateSelectors.allFollowers());

    useEffect(() => {
        dispatch(fetchFollowers());
    }, []);

    return (
        <div className="followers">
            <header>
                <div onClick={() => history.goBack()}>
                    {icons.chevron}
                </div>
                <h3>Followers</h3>
                <div></div>
            </header>
            <ul className="followers-list">
                {
                    allFollowers.map(follower => (
                        <Follower key={follower.id} user={follower} />
                    ))
                }
            </ul>
            <BottomNav />
        </div>
    );
}

const Follower = ({ user }) => {
    return (
        <li className="follower">
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



// n + 1 query, fetch