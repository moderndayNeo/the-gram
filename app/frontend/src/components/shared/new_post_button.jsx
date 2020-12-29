import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { setOriginalImage } from '../../redux/actions/upload_actions';

export default function NewPostButton(props) {
    const history = useHistory();
    const [photoUrl, setPhotoUrl] = useState('');
    const [photoFile, setPhotoFile] = useState(null);

    const handleUpload = (e) => {
        const reader = new FileReader();
        const file = e.currentTarget.files[0]; // { name: ..., size: ..., lastModified: ... }

        // create new Image(), set reader.result as the src, save it in stateqq

        const localImageUrl = window.URL.createObjectURL(file);
        // blob: http://localhost:3000/07401b46-4526-4f2f-8a49-2fa148fc047a
        // can be used as img url instead of full base 64 url

        reader.onloadend = () => {
            setPhotoUrl(reader.result); // reader.result is the base64 url
            setPhotoFile(file);
        };

        if (file) {
            reader.readAsDataURL(file); // converts img to large base64 string
        } else {
            setPhotoUrl('');
            setPhotoFile(null);
        }
    };

    useEffect(() => {
        if (photoFile && photoUrl) {

            history.push({
                pathname: "/create/style",
                state: {
                    photoFile,
                    photoUrl,
                    type: props.type,
                }
            });
        }
    }, [photoUrl, photoFile])

    return (
        <div className="new-post-button">
            <label htmlFor="file-upload">
                {props.text && <p>{props.text}</p>}
                {props.icon}
            </label>
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
