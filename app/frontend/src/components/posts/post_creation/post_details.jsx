import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import icons from '../../shared/icons/svg-icons';
import UserAvatar from '../../shared/user_avatar';
import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../../../redux/actions/post_actions';
import stateSelectors from '../../../util/state_selectors';
import { dataURItoBlob } from '../../../util/upload_utils';
import { beginUpload } from '../../../redux/actions/upload_actions';
import LoadingPlaceholder from '../../shared/loading_placeholder';

export default function PostDetails() {
    const [caption, setCaption] = useState('');
    const uploading = useSelector(stateSelectors.postUploading());
    const history = useHistory();
    const dispatch = useDispatch();
    const editedImage = useSelector(stateSelectors.editedImage());
    const imgSrc = editedImage ? editedImage.toDataURL() : '';
    const currentUser = useSelector(stateSelectors.currentUser());

    const submitPost = () => {
        const dataURL = editedImage.toDataURL('image/png');
        const blob = dataURItoBlob(dataURL);

        const formData = new FormData();
        formData.append('post[photo]', blob);
        formData.append('post[caption]', caption);

        dispatch(beginUpload());
        dispatch(createPost(formData))
            .then(() => {
                history.push('/');
            });
    };

    return uploading ?
        <LoadingPlaceholder spinner={true} /> :
        <div className="post-details">
            <PostDetailsHeader submitPost={submitPost} />
            <Caption
                userImage={currentUser.image_url}
                setCaption={setCaption}
                caption={caption}
                imgSrc={imgSrc}
            />
        </div>;
}

const PostDetailsHeader = ({ submitPost }) => (
    <header>
        <Link to='/create/style'>
            {icons.chevron}
        </Link>
        <h3>New Post</h3>
        <Link
            to="/"
            onClick={(e) => submitPost(e)}
        >
            Share
        </Link>
    </header>
);

const Caption = ({ userImage, setCaption, caption, imgSrc }) => {
    return (
        <section className="caption">
            <UserAvatar imageUrl={userImage} />
            <textarea
                placeholder="Write a caption..."
                onChange={(e) => setCaption(e.target.value)}
                value={caption}
            />
            <img className="post-image" src={imgSrc} alt="post preview" />
        </section>
    );
};