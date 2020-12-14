import React from 'react';
import { useSelector } from 'react-redux';

export default function CurrentUserAvatar() {
    const currentUserId = useSelector(state => state.session.id);
    const imageUrl = useSelector(state => state.entities.users[currentUserId].image_url);

    return (
        <img className="user-avatar" src={imageUrl || window.noAvatarImg} alt="user avatar"/>
    );
}


