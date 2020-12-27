import React from 'react';
import { useHistory } from 'react-router-dom';
import icons from '../shared/icons/svg-icons';
import BottomNav from '../shared/bottom_nav';
import UserAvatar from '../shared/user_avatar';
import stateSelectors from '../../util/state_selectors';
import { useSelector } from 'react-redux';


export default function EditProfile() {
    const history = useHistory();
    const currentUser = useSelector(stateSelectors.currentUser());

    return (
        <div className="edit-profile scroll-page">
            <header className="fixed-header">
                <div onClick={() => history.goBack()}>
                    {icons.chevron}
                </div>
                <h3>Edit Profile</h3>
                <div></div>
            </header>

            <main>

                <div className="edit-image">
                    <UserAvatar imageUrl={currentUser.image_url} />
                    <div className="text">
                        <h3>{currentUser.username}</h3>
                        <button
                            onClick={() => null}>
                            Change Profile Photo</button>
                    </div>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
