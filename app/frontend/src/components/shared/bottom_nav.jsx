import React from 'react';
import icons from './icons/svg-icons';
import UserAvatar from './user_avatar';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import stateSelectors from '../../util/state_selectors';
import NewPostButton from './new_post_button';

export default function BottomNav() {
    const currentUser = useSelector(stateSelectors.currentUser());
    const clipboardPopup = useSelector(stateSelectors.clipboardPopup());
    const editProfilePopup = useSelector(stateSelectors.editProfilePopup());
    const passwordPopup = useSelector(stateSelectors.passwordPopup());
    const location = useLocation();
    const pathname = location.pathname;
    const avatarBordered = (pathname === `/users/${currentUser.id}`) ? true : false;

    return (
        <nav className="bottom-nav">
            {clipboardPopup && <BottomNavPopup text="Link copied to clipboard." />}
            {editProfilePopup && <BottomNavPopup text="Profile saved." />}
            {passwordPopup && <BottomNavPopup text="Password changed." />}

            <div className="links">
                <Link to="/">
                    {pathname === '/' ? icons.filledHome : icons.unfilledHome}
                </Link>

                <Link to="/explore">
                    {pathname === '/explore' ? icons.filledCompass : icons.unfilledCompass}
                </Link>

                <NewPostButton icon={icons.newPost} imageFor="post" />

                <Link to="/accounts/activity">
                    {pathname === '/accounts/activity' ? icons.filledHeart : icons.unfilledHeart}
                </Link>

                <Link to={`/users/${currentUser.id}`}>
                    <div className={`avatar-container ${avatarBordered === true ? 'bordered' : ''}`}>
                        <UserAvatar imageUrl={currentUser.image_url} />
                    </div>
                </Link>
            </div>
        </nav>
    );
}

const BottomNavPopup = ({ text }) => {
    return (
        <div className="bottom-nav-popup">
            <p>{text}</p>
        </div>
    );
};

