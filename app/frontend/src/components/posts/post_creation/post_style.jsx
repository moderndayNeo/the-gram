import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import icons from '../../shared/icons/svg-icons';

export default function PostStyle() {
    const location = useLocation();

    return (
        <div className="post-style">
            <PostStyleHeader />
            <img src={location.state ? location.state.photoUrl : window.placeholderImg} alt="post photo" />

            <PostStyleFooter />
        </div>
    );
}


const PostStyleHeader = () => (
    <header>
        <Link to="/">
            {icons.cross}
        </Link>
        <h3>New Photo Post</h3>
        <Link to="/create/details">
            Next
        </Link>
    </header>
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