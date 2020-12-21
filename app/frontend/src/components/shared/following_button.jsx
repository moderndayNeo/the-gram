import React from 'react';
import { unfollowUser } from '../../redux/actions/session_actions';
import { useDispatch } from 'react-redux';

export default function FollowingButton({ userId }) {
    const dispatch = useDispatch();

    return (
        <button
            className="following-button"
            onClick={() => dispatch(unfollowUser(userId))}
        >
            Following
        </button>);
}
