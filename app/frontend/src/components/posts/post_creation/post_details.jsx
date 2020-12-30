import React, { useState } from 'react';
import { useLocation, Link, useHistory } from 'react-router-dom';
import icons from '../../shared/icons/svg-icons';
import UserAvatar from '../../shared/user_avatar';
import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../../../redux/actions/post_actions';
import stateSelectors from '../../../util/state_selectors';
import { createFileWithImage, dataURItoBlob } from '../../../util/upload_utils';

export default function PostDetails() {
    const history = useHistory()
    const editedImage = useSelector(stateSelectors.editedImage());

    const dispatch = useDispatch();
    const currentUser = useSelector(stateSelectors.currentUser());
    const [caption, setCaption] = useState('');

    const submitPost = () => {
        const dataURL = editedImage.toDataURL('image/png');
        const blob = dataURItoBlob(dataURL);

        const formData = new FormData();
        formData.append('post[photo]', blob);
        formData.append('post[caption]', 'caption77');

        dispatch(createPost(formData)).then(() => history.push('/'))
    };

    return (
        <div className="post-details">
            <PostDetailsHeader submitPost={submitPost} />
            <Caption
                userImage={currentUser.image_url}
                setCaption={setCaption} caption={caption}
            />
        </div>
    );
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

const Caption = ({ userImage, setCaption, caption }) => {

    return (
        <section className="caption">
            <UserAvatar imageUrl={userImage} />

            <textarea
                placeholder="Write a caption..."
                onChange={(e) => setCaption(e.target.value)}
                value={caption}
            />

            <canvas className="post-image"></canvas>
        </section>
    );
};
