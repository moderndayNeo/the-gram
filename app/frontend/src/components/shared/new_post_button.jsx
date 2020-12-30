import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { setOriginalImage, setImageFor } from '../../redux/actions/upload_actions';
import stateSelectors from '../../util/state_selectors';
import { useSelector } from 'react-redux';
import { fetchImageFromFile, createFileWithImage, dataURItoBlob } from '../../util/upload_utils';
import { createPost } from '../../redux/actions/post_actions';


export default function NewPostButton(props) {
    const history = useHistory();
    const originalImage = useSelector(stateSelectors.originalImage());
    const newCanvas = React.useRef();

   
    const handleUpload = (e) => {
        fetchImageFromFile(e.currentTarget.files[0])
            .then(img => {
                // newCanvas.current.getContext("2d").drawImage(img, 0, 0);

                    // const url = newCanvas.current.toDataURL('image/png')
                    // const blob = dataURItoBlob(url)
                    // console.log(blob);
                    // const file = new File([blob], "name");
                    // console.log(file);
                    // it kind of worked with blob: The image is not scaled
                    // Try editing the image, convert to canvas,
                    // convert to blob, then send to backend
                    
                    // Also works when converting blob to file
                    // Try editing image, then converting 
                    
                    // const formData = new FormData();
                // formData.append('post[photo]', blob);
                // formData.append('post[caption]', 'testcaption');

                // dispatch(createPost(formData));

                // console.log(canvas)
                // const file = createFileWithImage(canvas).then((file) =>  console.log(file))

                // convert canvas to file object

                dispatch(setOriginalImage(img));
                dispatch(setImageFor(props.imageFor));
            });
    };

    useEffect(() => {
        if (originalImage) {
            history.push(`/create/style`);
        }
    });

    return (
        <div className="new-post-button">
            <label htmlFor="file-upload">
                {props.text && <p>{props.text}</p>}
                {props.icon}
            </label>
            <canvas style={{ 'display': 'none' }} id="newCanvas" ref={newCanvas}></canvas>
            <input
                className="hidden-file-input"
                id="file-upload"
                type="file"
                onChange={(e) => handleUpload(e)}
                multiple={false}
                accept=".jpg, .jpeg, .png, .pdf"
            />
        </div>
    );
}
