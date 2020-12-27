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
                <h3 className="section-title">ACCOUNT</h3>
                <ul>
                    <OptionBar
                        path="/accounts/edit"
                        text="Edit Profile"
                        callbackFn={null} 
                        className="full-border"
                        />

                    <OptionBar
                        path="/accounts/password/change"
                        text="Change Password"
                        callbackFn={null} />
                </ul>
            </section>

            <OptionBar
                className="logout-bar full-border"
                path="/signup"
                text="Log Out"
                callbackFn={() => dispatch(logoutUser())} />

        </div>
    );
}

const OptionBar = ({ path, callbackFn, text, className }) => {
    return (
        <div className={`option-bar ${className}`}>
            <Link to={path}
                onClick={callbackFn ? () => callbackFn() : null}>
                <p>{text}</p>
                <img src={window.greyChevron} alt="chevron icon" />
            </Link>
        </div>
    );
};