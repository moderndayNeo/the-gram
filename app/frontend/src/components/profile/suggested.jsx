import React, { useEffect } from 'react';
import icons from '../shared/icons/svg-icons';
import { useHistory, Link } from 'react-router-dom';
import { fetchFollowers } from '../../redux/actions/user_actions';
import stateSelectors from '../../util/state_selectors';
import { useSelector, useDispatch } from 'react-redux';
import BottomNav from '../shared/bottom_nav';

export default function Followers() {
    const history = useHistory();
    const dispatch = useDispatch();
    // const suggestedUsers = useSelector(stateSelectors.suggestedUsers());

    useEffect(() => {
        dispatch(fetchFollowers());
    }, []);

    return (
        <div className="followers-and-following">
            <header>
                <div onClick={() => history.goBack()}>
                    {icons.chevron}
                </div>
                <h3>Discover People</h3>
                <div></div>
            </header>

           <h4>Suggested</h4>

            <ul className="user-list">
                {/* {
                    suggestedUsers.map(user => (
                        <UserLink key={user.id} user={user} />
                    ))
                } */}
            </ul>
            <BottomNav />
        </div>
    );
}




// Api call to get suggested users -> return a random list of users from the 
// People not following you