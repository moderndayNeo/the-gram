import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import icons from '../../shared/icons/svg-icons';

export default function PostStyle() {
    const location = useLocation();
    const photoUrl = location.state ? location.state.photoUrl : window.placeholderImg;
    const photoFile = location.state ? location.state.photoFile : null;
    const photoType = location.state ? location.state.type : 'post';

    return (
        <div className="post-style">
            <PostStyleHeader
                photoFile={photoFile}
                photoUrl={photoUrl}
                photoType={photoType}
            />
            <img src={photoUrl} alt="post photo" />
            <PostStyleFooter />
        </div>
    );
}

const PostStyleHeader = ({ photoFile, photoUrl, photoType }) => {
    const updateProfilePicture = () => {
        e.preventDefault();

        console.log('updating profile pic');
        // handle profile pic upload
    };

    return (
        <header>
            <Link to="/">
                {icons.cross}
            </Link>
            <h3>New Photo Post</h3>

            {
                photoType === 'profile' ?
                    <button onClick={() => updateProfilePicture()}>Save</button> :
                    <Link to={{
                        pathname: '/create/details',
                        state: {
                            photoUrl,
                            photoFile
                        }
                    }}>Next</Link>
            }
        </header >
    );
};

const PostStyleFooter = () => {
    const [selected, setSelected] = useState('filter');

    return (
        <footer>
            <button onClick={() => setSelected('filter')} className={selected === 'filter' ? "selected" : null}>Filter</button>
            <button onClick={() => setSelected('edit')} className={selected === 'edit' ? "selected" : null}>Edit</button>
        </footer>
    );
};


