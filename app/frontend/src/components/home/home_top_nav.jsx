import React from 'react';
import icons from '../shared/icons/svg-icons';
import MainLogo from '../shared/main_logo';
import { Link } from 'react-router-dom';
import NewPostButton from '../shared/new_post_button';

export default function HomeTopNav() {
    return (
        <nav className="home-top-nav">
            <NewPostButton icon={icons.camera} />
            <Link to="/">
                <MainLogo />
            </Link>
            {icons.paperPlane}
        </nav>);
}
