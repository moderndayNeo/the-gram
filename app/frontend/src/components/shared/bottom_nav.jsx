import React from 'react';
import icons from './icons/svg-icons';
import UserAvatar from './user_avatar';
import { useLocation, Link } from 'react-router-dom';

export default function BottomNav({ currentUser }) {
    const location = useLocation();
    // conditionally change icons based on location
    // console.log(location)

    return (
        <nav className="bottom-nav">
            <Link to="/">
                {location.pathname === '/' ? icons.filledHome : icons.unfilledHome}
            </Link>

            {/* <Link to="/explore"> */}
            {icons.unfilledCompass}
            {/* </Link> */}

            <label htmlFor="file-upload">
                {icons.newPost}
            </label>
            <input className="hidden-file-input" id="file-upload" type="file" />


            {/* <Link to="/accounts/activity"> */}
            {icons.unfilledHeart}
            {/* </Link> */}

            {/* <Link to={`/${currentUser.username}`}> */}
                <UserAvatar imageUrl={currentUser.image_url} />
            {/* </Link> */}
        </nav>
    );
}
