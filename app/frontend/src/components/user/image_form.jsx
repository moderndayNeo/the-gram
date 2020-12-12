import React, { useState } from 'react';

export default function ImageForm() {
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

    const handleSubmit = (e) => {
        e.preventDefault();

        // const formData = new FormData()
        // formData.append()

    };

    const preview = photoUrl ? <img src={photoUrl} alt="" /> : null;

    return (
        <div>
            <h2>Upload Image</h2>

            <form>
                <input type="file" onChange={(e) => handleUpload(e)} />
                {preview}

                <button onClick={(e) => handleSubmit(e)}>Upload Image</button>
            </form>
        </div>
    );
}
