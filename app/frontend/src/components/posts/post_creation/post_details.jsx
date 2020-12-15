import React, { useState } from 'react';
import { useLocation, Link, useHistory } from 'react-router-dom';
import icons from '../../shared/icons/svg-icons';
import UserAvatar from '../../shared/user_avatar';
import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../../../redux/actions/post_actions';

export default function PostDetails() {
    const location = useLocation();
    const dispatch = useDispatch();
    const photoUrl = location.state ? location.state.photoUrl : window.placeholderImg;
    const photoFile = location.state ? location.state.photoFile : null;
    const currentUserId = useSelector((state) => state.session.id);
    const currentUser = useSelector(
        (state) => state.entities.users[currentUserId]
    );
    const [caption, setCaption] = useState('');

    const submitPost = () => {
        const formData = new FormData();
        formData.append('post[photo]', photoFile);
        formData.append('post[caption]', caption);

        dispatch(createPost(formData));
    };


    return (
        <div className="post-details">
            <PostDetailsHeader photoFile={photoFile} photoUrl={photoUrl} submitPost={submitPost} />
            <Caption userImage={currentUser.imageUrl} photoUrl={photoUrl} setCaption={setCaption} caption={caption} />
        </div>
    );
}

const PostDetailsHeader = ({ photoFile, photoUrl, submitPost }) => (
    <header>
        <Link to={{
            pathname: '/create/style',
            state: {
                photoUrl,
                photoFile
            }
        }}>
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

const Caption = ({ userImage, photoUrl, setCaption, caption }) => {
    return (
        <section className="caption">
            <UserAvatar imageUrl={userImage} />

            <textarea
                placeholder="Write a caption..."
                onChange={(e) => setCaption(e.target.value)}
                value={caption}
            />

            <img className="post-image" src={photoUrl} alt="" />
        </section>
    );
};