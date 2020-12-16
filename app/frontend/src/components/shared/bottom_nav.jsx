import React, { useState, useEffect } from 'react';
import icons from './icons/svg-icons';
import UserAvatar from './user_avatar';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import stateSelectors  from '../../util/state_selectors';


export default function BottomNav() {
    const currentUser = useSelector(stateSelectors.currentUser())


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
        } else {
            setPhotoUrl('');
            setPhotoFile(null);
        }
    };

    useEffect(() => {
        if (photoFile && photoUrl) {
            history.push({
                pathname: "/create/style",
                state: { photoFile, photoUrl }
            });
        }
    }, [photoUrl, photoFile]);

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
                multiple={false}
                accept=".jpg, .jpeg, .png, .pdf"
            />


            {/* <Link to="/accounts/activity"> */}
            {icons.unfilledHeart}
            {/* </Link> */}

            <Link to={`/users/${currentUser.id}`}>
                <UserAvatar imageUrl={currentUser.image_url} />
            </Link>
        </nav>
    );
}
