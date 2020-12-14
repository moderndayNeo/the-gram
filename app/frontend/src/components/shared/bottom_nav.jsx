import React from 'react';
import CurrentUserAvatar from './current_user_avatar';
import icons from './icons/svg-icons';
// import UserAvatar from './user_avatar';

export default function BottomNav() {

    return (
        <nav className="bottom-nav">
            {icons.filledHome}
            {icons.unfilledCompass}
            {icons.newPost}
            {icons.unfilledHeart}
            {/* <UserAvatar imageUrl={} /> */}
            <CurrentUserAvatar />
        </nav>
    );
}
