import React from 'react';
// import {useSelector} from 'react-redux'
// import stateSelectors from '../../util/state_selectors'

export default function UserAvatar({ imageUrl }) {
    // const currentUserImg = useSelector(stateSelectors.currentUserImageUrl())

    return (
        <img
            className="user-avatar"
            src={imageUrl || window.noAvatarImg}
            alt="user avatar" />
    );
}
