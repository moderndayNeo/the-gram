import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { setOriginalImage, setImageFor } from '../../redux/actions/upload_actions';
import stateSelectors from '../../util/state_selectors';
import { useSelector } from 'react-redux';
import { fetchImageFromFile} from '../../util/upload_utils';

export default function NewPostButton(props) {
    const history = useHistory();
    const originalImage = useSelector(stateSelectors.originalImage());
    const newCanvas = React.useRef();

    const handleUpload = (e) => {
        fetchImageFromFile(e.currentTarget.files[0])
            .then(img => {
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
