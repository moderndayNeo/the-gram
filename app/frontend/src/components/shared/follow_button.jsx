import React from 'react';
import { followUser } from '../../redux/actions/session_actions';
import { useDispatch } from 'react-redux';

export default function FollowButton({ userId }) {
    const dispatch = useDispatch();

    return (
        <button
            className="follow-button"
            onClick={() => dispatch(followUser(userId))}
        >
            Follow
        </button>
    );
}
