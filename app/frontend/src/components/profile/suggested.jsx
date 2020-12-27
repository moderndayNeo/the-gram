import React, { useEffect } from 'react';
import icons from '../shared/icons/svg-icons';
import { useHistory } from 'react-router-dom';
import { fetchSuggestedUsers } from '../../redux/actions/user_actions';
import stateSelectors from '../../util/state_selectors';
import { useSelector, useDispatch } from 'react-redux';
import BottomNav from '../shared/bottom_nav';
import UserLink from './user_link';

export default function Suggested() {
    const history = useHistory();
    const dispatch = useDispatch();
    const suggestedUsers = useSelector(stateSelectors.suggestedUsers());

    useEffect(() => {
        dispatch(fetchSuggestedUsers());
    }, []);

    return (
        <div className="suggested user-list-page scroll-page">
            <header className="fixed-header">
                <div onClick={() => history.goBack()}>
                    {icons.chevron}
                </div>
                <h3>Discover People</h3>
                <div></div>
            </header>

            <h4 className="suggested-title">Suggested</h4>

            <ul className="user-list">
                {
                    suggestedUsers.map(user => (
                        <UserLink key={user.id} user={user} />
                    ))
                }
            </ul>
            <BottomNav />
        </div>
    );
}