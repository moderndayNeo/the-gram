import React, { useEffect } from 'react';
import UserLink from '../profile/user_link';
import stateSelectors from '../../util/state_selectors';
import { fetchSuggestedUsers } from '../../redux/actions/user_actions';
import { useSelector, useDispatch } from 'react-redux';
import LoadingPlaceholder from './loading_placeholder';

export default function SuggestedUsersList() {
    const dispatch = useDispatch();
    const suggestedUsers = useSelector(stateSelectors.suggestedUsers());
    

    useEffect(() => {
        dispatch(fetchSuggestedUsers());
    }, []);

    return suggestedUsers.length > 1 ?
        <ul className="user-list">
            {
                suggestedUsers.map(user => (
                    <UserLink key={user.id} user={user} />
                ))
            }
        </ul> : <LoadingPlaceholder />;

}
