import React from 'react';
import icons from './icons/svg-icons';
import UserAvatar from './user_avatar';

export default function BottomNav({ currentUser }) {

    return (
        <nav className="bottom-nav">
            {icons.filledHome}
            {icons.unfilledCompass}
            {icons.newPost}
            {icons.unfilledHeart}
            <UserAvatar imageUrl={currentUser.image_url} />
        </nav>
    );
}
