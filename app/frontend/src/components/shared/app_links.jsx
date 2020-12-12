import React from 'react';
import { Link } from 'react-router-dom';

export default function AppLinks() {
    return (
        <div>
            <p>Get the app.</p>
            <a className="app-store-link" href="https://itunes.apple.com/app/instagram/id389801252?pt=428156&ct=igweb.loginPage.badge&mt=8&vt=lo">
                <img src={window.appStoreLinkImg} target="_blank" alt="app store link" />
            </a>

            <a className="app-store-link" href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3D520CE457-F1D7-46B5-A96F-ADC7848DC2AC%26utm_content%3Dlo%26utm_medium%3Dbadge">
                <img src={window.playStoreLinkImg} target="_blank" alt="play store link" />
            </a>
        </div>
    );
}


// look up target blank on a react-router-link