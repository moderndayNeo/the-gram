import React from 'react';
import { followUser, unfollowUser } from '../../redux/actions/session_actions';
import { useDispatch, useSelector } from 'react-redux';
import stateSelectors from '../../util/state_selectors';

export default function DynamicFollowButton({ userId }) {
    const isFollowing = useSelector(stateSelectors.currentUserIsFollowing(userId));
    const dispatch = useDispatch();

    return isFollowing ?
        <button
            className="following-button"
            onClick={() => dispatch(unfollowUser(userId))}
        >
            Following
         </button> :
        <button
            className="follow-button"
            onClick={() => dispatch(followUser(userId))} >
            Follow
        </button>;
}
