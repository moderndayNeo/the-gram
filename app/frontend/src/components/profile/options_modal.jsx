import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/actions/session_actions';
import icons from '../shared/icons/svg-icons';
import { Link } from 'react-router-dom';

export default function OptionsModal({ setOptionsModal }) {
    const dispatch = useDispatch();

    return (
        <div className="options-modal scroll-page">
            <header className="fixed-header">
                <div onClick={() => setOptionsModal(false)}>
                    {icons.cross}
                </div>
                <h3>Options</h3>
                <div className="blank-div"></div>
            </header>

            <section>
                <h3>ACCOUNT</h3>

            </section>

            {/* <div className="option-bar">
                <Link to="/signup" onClick={() => dispatch(logoutUser())}>
                    <p>Log Out</p>
                    <img src={window.greyChevron} alt="chevron icon" />
                </Link>
            </div> */}

            <OptionBar path="/signup" callbackFn={() => dispatch(logoutUser())} text="Log Out" />

        </div>
    );
}


const OptionBar = ({ path, callbackFn, text }) => {
    return (
        <div className="option-bar">
            <Link to={path} onClick={() => callbackFn}>
                <p>{text}</p>
                <img src={window.greyChevron} alt="chevron icon" />
            </Link>
        </div>
    );
};