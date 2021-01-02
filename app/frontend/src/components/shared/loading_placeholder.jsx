import React from 'react';
import LoadingSpinner from './loading_spinner';

export default function LoadingPlaceholder(props) {
    return (
        <div className="loading-placeholder">
            {
                props.spinner ?
                    <LoadingSpinner /> :
                    <img src={window.cameraLoader} alt="" />
            }
        </div>
    );
}