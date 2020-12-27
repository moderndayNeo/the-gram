import React, { useState } from 'react';
import BottomNav from '../shared/bottom_nav';
import { useHistory } from 'react-router-dom';
import UserAvatar from '../shared/user_avatar';
import { useSelector } from 'react-redux';
import stateSelectors from '../../util/state_selectors';
import icons from '../shared/icons/svg-icons';
import UserErrors from '../shared/user_errors';
import { updateUser } from '../../redux/actions/user_actions';

export default function ChangePassword() {
    const [info, setInfo] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [displayMessage, setDisplayMessage] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const history = useHistory();
    const currentUser = useSelector(stateSelectors.currentUser());
    const passwordsDontMatch = info.newPassword !== info.confirmNewPassword;
    const allFormsFilled = Object.values(info).every(field => field.length > 0);

    const updateValue = type => {
        return e => {
            setDisplayMessage(false);
            setInfo({ ...info, [type]: e.currentTarget.value });
        };
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (passwordsDontMatch) return setDisplayMessage(true);

        setSubmitting(true);
        dispatch(updateUser(currentUser.id, { user: { password: info.newPassword } }))
            .then(() => setSubmitting(false))
    };

    const handleSuccess = () => {
        // clear inputs
        // passsword changed popup
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
                        onChange={updateValue("oldPassword")}
                    />
                    <UserErrors />

                    <label>New Password</label>
                    <input
                        className="grey-input"
                        type="password"
                        value={info.newpassword}
                        onChange={updateValue("newPassword")}
                    />
                    {displayMessage && <p className="password-message">Passwords must match</p>}

                    <label>Confirm New Password</label>
                    <input
                        className="grey-input"
                        type="password"
                        value={info.confirmNewPassword}
                        onChange={updateValue("confirmNewPassword")}
                    />
                    {displayMessage && <p className="password-message">Passwords must match</p>}

                    <button
                        disabled={allFormsFilled ? false : true}
                        className="blue-button"
                        onClick={(e) => handleSubmit(e)}>Change Password</button>
                        {submitting && <p>Submitting</p>}

                </form>

            </main>
            <BottomNav />
        </div>
    );
}
