import React from 'react';
import icons from '../shared/icons/svg-icons';
import { useHistory } from 'react-router-dom';
import stateSelectors from '../../util/state_selectors';
import { useSelector } from 'react-redux';
import BottomNav from '../shared/bottom_nav';
import UserLink from './user_link'

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
