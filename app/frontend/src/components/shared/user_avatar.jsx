import React from 'react';

export default function UserAvatar({ imageUrl }) {
    return (
        <img className="user-avatar" src={imageUrl || window.noAvatarImg} alt="user avatar" />
    );
}
