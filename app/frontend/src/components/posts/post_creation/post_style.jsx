import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import stateSelectors from '../../../util/state_selectors';
import PostStyleHeader from './post_style_header';
import ImageEditor from './image_editor';
import { useHistory } from 'react-router-dom';
import LoadingPlaceholder from '../../shared/loading_placeholder';


export default function PostStyle() {
    const history = useHistory();
    const uploading = useSelector(stateSelectors.postUploading());
    const imageFor = useSelector(stateSelectors.imageFor());
    const originalImage = useSelector(stateSelectors.originalImage());

    useEffect(() => {
        if (!originalImage) {
            history.push("/");
        }
    });

    return (
        <div className="post-style">
            <PostStyleHeader imageFor={imageFor} />
            {
                uploading ?
                    <LoadingPlaceholder spinner={true} /> :
                    <ImageEditor originalImage={originalImage} forceSquareImage={false} />
            }
        </div>
    );
}