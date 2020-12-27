import React, { useState } from 'react';
import BottomNav from '../shared/bottom_nav';
import { useHistory } from 'react-router-dom';
import UserAvatar from '../shared/user_avatar';
import { useSelector } from 'react-redux';
import stateSelectors from '../../util/state_selectors';
import icons from '../shared/icons/svg-icons';

export default function ChangePassword() {
    const history = useHistory();
    const currentUser = useSelector(stateSelectors.currentUser());
    const [info, setInfo] = useState({
        oldPassword: '',
        newpassword: '',
        confirmNewPassword: ''
    });

    const updateValue = type => {
        return e => {
            setInfo({ ...info, [type]: e.currentTarget.value });
        };
    };

    return (
        <div className="edit-profile scroll-page" id="change-password">
            <header className="fixed-header">
                <div onClick={() => history.goBack()}>
                    {icons.chevron}
                </div>
                <h3>Change Password</h3>
                <div></div>
            </header>

            <main>

                <div className="edit-image">
                    <UserAvatar imageUrl={currentUser.image_url} />
                    <div className="text">
                        <h3 id="username">{currentUser.username}</h3>
                    </div>
                </div>

                <form>
                    <label>Old Password</label>
                    <input
                        className="grey-input"
                        type="password"
                        value={info.oldPassword}
                        onChange={updateValue("password")}
                    />

                    <label>New Password</label>
                    <input
                        className="grey-input"
                        type="password"
                        value={info.newpassword}
                        onChange={updateValue("password")}
                    />

                    <label>Confirm New Password</label>
                    <input
                        className="grey-input"
                        type="password"
                        value={info.confirmNewPassword}
                        onChange={updateValue("confirmNewPassword")}
                    />

                    <button className="blue-button" onClick={(e) => handleSubmit(e)}>Change Password</button>

                </form>

            </main>
            <BottomNav />
        </div>
    );
}
