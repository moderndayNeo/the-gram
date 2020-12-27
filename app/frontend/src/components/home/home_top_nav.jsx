import React from 'react';
import icons from '../shared/icons/svg-icons';
import MainLogo from '../shared/main_logo';
import { Link } from 'react-router-dom';
import NewPostButton from '../shared/new_post_button';
import { displayDirectMessageModal } from '../../redux/actions/ui_actions';
import { useDispatch } from 'react-redux';

export default function HomeTopNav() {
    const dispatch = useDispatch();

    return (
        <nav className="home-top-nav">
            <NewPostButton icon={icons.camera} />
            <Link to="/">
                <MainLogo />
            </Link>
            <button onClick={() => dispatch(displayDirectMessageModal())}>
                {icons.paperPlane}
            </button>
        </nav>);
}
