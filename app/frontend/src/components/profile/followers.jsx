import React, { useEffect } from 'react';
import icons from '../shared/icons/svg-icons';
import { useHistory } from 'react-router-dom';
import { fetchFollowers } from '../../redux/actions/user_actions';
import stateSelectors from '../../util/state_selectors';
import { useSelector, useDispatch } from 'react-redux';
import BottomNav from '../shared/bottom_nav';
import UserLink from './user_link';

export default function Followers() {
    const history = useHistory();
    const dispatch = useDispatch();
    const allFollowers = useSelector(stateSelectors.allFollowers());

    useEffect(() => {
        dispatch(fetchFollowers());
    }, []);

    return (
        <div className="followers user-list-page">
            <header className="fixed-header">
                <div onClick={() => history.goBack()}>
                    {icons.chevron}
                </div>
                <h3>Followers</h3>
                <div></div>
            </header>
            <ul className="user-list">
                {
                    allFollowers.map(follower => (
                        <UserLink key={follower.id} user={follower} />
                    ))
                }
            </ul>
            <BottomNav />
        </div>
    );
}
