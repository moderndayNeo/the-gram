import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import icons from '../../shared/icons/svg-icons';

export default function PostStyle() {
    const location = useLocation();
    const photoUrl = location.state ? location.state.photoUrl : window.placeholderImg
    const photoFile = location.state ? location.state.photoFile : null
    console.log(photoFile)
    console.log(photoUrl)

    return (
        <div className="post-style">
            <PostStyleHeader photoFile={photoFile} photoUrl={photoUrl} />
            {/* <img src={photoUrl} alt="post photo" /> */}
            <img src={window.placeholderImg} alt="post photo" />

            <PostStyleFooter />
        </div>
    );
}


const PostStyleHeader = ({ photoFile, photoUrl }) => (
    <header>
        <Link to="/">
            {icons.cross}
        </Link>
        <h3>New Photo Post</h3>
        <Link to={{
            pathname: '/create/details',
            state: {
                photoUrl,
                photoFile
            }
        }}>Next</Link>
    </header >
);

const PostStyleFooter = () => {
    const [selected, setSelected] = useState('filter');

    return (
        <footer>
            <button onClick={() => setSelected('filter')} className={selected === 'filter' ? "selected" : null}>Filter</button>
            <button onClick={() => setSelected('edit')} className={selected === 'edit' ? "selected" : null}>Edit</button>
        </footer>
    );
};


