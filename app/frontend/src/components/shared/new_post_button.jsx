import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

export default function NewPostButton({ icon }) {
    const history = useHistory();
    const [photoUrl, setPhotoUrl] = useState('');
    const [photoFile, setPhotoFile] = useState(null);

    const handleUpload = (e) => {
        const reader = new FileReader();
        const file = e.currentTarget.files[0];
        reader.onloadend = () => {
            setPhotoUrl(reader.result);
            setPhotoFile(file);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setPhotoUrl('');
            setPhotoFile(null);
        }
    };

    useEffect(() => {
        if (photoFile && photoUrl) {
            history.push({
                pathname: "/create/style",
                state: { photoFile, photoUrl }
            });
        }
    }, [photoUrl, photoFile]);

    return (
        <div className="new-post-button">
            <label htmlFor="file-upload">
                {icon}
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
