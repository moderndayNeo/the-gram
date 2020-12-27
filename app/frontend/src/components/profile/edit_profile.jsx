import React from 'react';
import icons from '../shared/icons/svg-icons'

export default function EditProfile() {
    return (
        <div className="edit-profile">
            <header className="fixed-header">
                <div onClick={() => history.goBack()}>
                    {icons.chevron}
                </div>
                <h3>Edit Profile</h3>
                <div></div>
            </header>
        </div>
    );
}
