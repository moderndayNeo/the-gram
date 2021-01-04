import React from 'react';
import LoadingSpinner from './loading_spinner';

export default function LoadingPlaceholder(props) {
    return (
        <div className="loading-placeholder">
            {
                props.spinner ?
                    <div>
                        <img className="camera-loading-icon" src={window.cameraLoader} alt="" />
                        <LoadingSpinner />
                    </div> :
                    <img className="camera-loading-icon" src={window.cameraLoader} alt="" />
            }
        </div>
    );
}