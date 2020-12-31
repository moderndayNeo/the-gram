import React from 'react';

export default function DesktopModal() {
    return (
        <div className="desktop-modal modal-container">
            <div className="overlay">
                <div className="modal">
                    <div className="modal">
                        <img className="main-logo" src={window.mainLogoUrl} alt="logo" />
                        <p className="title">
                            <span>
                                The Gram is designed to be used on mobile devices. Please open this app on a mobile
                                or use mobile view in your desktop browser.
                            </span>
                            <span>
                                To access mobile view from a desktop device:
                            </span>
                        </p>

                        <div className="instructions-container">
                            <p>1. Please open your browser's DevTools.
                            <span> (Right-click + 'Inspect')</span>
                            </p>
                            <p>2. Toggle the device toolbar.
                            <span>(Command + Shift + M)</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



