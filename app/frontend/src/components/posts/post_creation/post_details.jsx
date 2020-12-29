import React, { useState } from 'react';
import { useLocation, Link, useHistory } from 'react-router-dom';
import icons from '../../shared/icons/svg-icons';
import UserAvatar from '../../shared/user_avatar';
import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../../../redux/actions/post_actions';
import stateSelectors from '../../../util/state_selectors';

export default function PostDetails() {
    const dispatch = useDispatch();
    const editedImage = useSelector(stateSelectors.editedImage());

    const currentUser = useSelector(stateSelectors.currentUser());
    const [caption, setCaption] = useState('');

    const submitPost = () => {
        const formData = new FormData();

        // convert canvas object to file object, append to formdata        

        formData.append('post[photo]', photoFile);
        formData.append('post[caption]', caption);

        dispatch(createPost(formData));
    };

    return (
        <div className="post-details">
            <PostDetailsHeader submitPost={submitPost} />
            <Caption userImage={currentUser.image_url} setCaption={setCaption} caption={caption} />
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

            {/* <img className="post-image" src={photoUrl} alt="" /> */}
            {/* img preview of editedImage */}
        </section>
    );
};
