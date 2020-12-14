import React from 'react';
import icons from '../shared/icons/svg-icons';
import MainLogo from '../shared/main_logo';
import { Link } from 'react-router-dom';

export default function HomeTopNav() {
    return (
        <nav className="home-top-nav">
            {icons.camera}
            <Link to="/">
                <MainLogo />
            </Link>
            {icons.paperPlane}
        </nav>);
}
