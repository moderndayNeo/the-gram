import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import icons from '../../shared/icons/svg-icons';

export default function PostStyle() {
    const location = useLocation();

    return (
        <div className="post-style">
            <PostStyleHeader />
            {/* <img src={location.state.photoUrl} alt="post photo"/> */}
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