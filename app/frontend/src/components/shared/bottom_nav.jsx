import React from 'react'
import icons from './icons/svg-icons'

export default function BottomNav() {

    const UserAvatar = () => (
        <img src={window.noAvatarImg} alt="user avatar"/>
    )

    return (
        <nav className="bottom-nav">
            {icons.filledHome}
            {icons.unfilledCompass}
            {icons.newPost}
            {icons.unfilledHeart}
            <UserAvatar />
        </nav>
    )
}
