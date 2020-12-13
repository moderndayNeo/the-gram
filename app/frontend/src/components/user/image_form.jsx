import React, { useState } from 'react';
import { updateUser } from '../../redux/actions/session_actions';
import { useDispatch } from 'react-redux';
import UserErrors from '../shared/user_errors';

export default function ImageForm({ currentUserId }) {
    const [photoUrl, setPhotoUrl] = useState('');
    const [photoFile, setPhotoFile] = useState(null);

    const handleUpload = (e) => {
        const reader = new FileReader();
        const file = e.currentTarget.files[0];
        reader.onloadend = () => {
            setPhotoUrl(reader.result);
            setPhotoFile(file);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setPhotoUrl('');
            setPhotoFile(null);
        }
    };

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('user[photo]', photoFile);

        dispatch(updateUser(currentUserId, formData));
    };

    const preview = photoUrl ? <img src={photoUrl} alt="" /> : null;

    return (
        <div>
            <h2>Upload Image</h2>

            <form>
                <input type="file" onChange={(e) => handleUpload(e)} />
                {preview}

                <button onClick={(e) => handleSubmit(e)}>Upload Image</button>
            </form>
            <UserErrors />
        </div>
    );
}
