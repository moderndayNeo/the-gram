import React from 'react';
import { useHistory } from 'react-router-dom';
import icons from '../shared/icons/svg-icons'


export default function EditProfile() {
    const history = useHistory()
    
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
