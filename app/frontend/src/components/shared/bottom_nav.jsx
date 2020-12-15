import React, { useState } from 'react';
import icons from './icons/svg-icons';
import UserAvatar from './user_avatar';
import { useLocation, useHistory, Link } from 'react-router-dom';

export default function BottomNav({ currentUser }) {
    const location = useLocation();
    const history = useHistory();
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
            return history.push({
                pathname: "/create/style",
                state: { photoFile, photoUrl }
            });
        } else {
            setPhotoUrl('');
            setPhotoFile(null);
        }
    };

    return (
        <nav className="bottom-nav">
            <Link to="/">
                {location.pathname === '/' ? icons.filledHome : icons.unfilledHome}
            </Link>

            {/* <Link to="/explore"> */}
            {location.pathname === '/explore' ? icons.filledCompass : icons.unfilledCompass}
            {/* </Link> */}

            <label htmlFor="file-upload">
                {icons.newPost}
            </label>
            <input
                className="hidden-file-input"
                id="file-upload"
                type="file"
                onChange={(e) => handleUpload(e)}
            />


            {/* <Link to="/accounts/activity"> */}
            {icons.unfilledHeart}
            {/* </Link> */}

            {/* <Link to={`/${currentUser.username}`}> */}
            <UserAvatar imageUrl={currentUser.image_url} />
            {/* </Link> */}
        </nav>
    );
}
