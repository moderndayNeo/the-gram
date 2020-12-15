import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import icons from '../../shared/icons/svg-icons';
import UserAvatar from '../../shared/user_avatar';
import { useSelector } from 'react-redux';

export default function PostDetails() {
    const location = useLocation();
    const photoUrl = location.state ? location.state.photoUrl : window.placeholderImg;
    const photoFile = location.state ? location.state.photoFile : null;
    const currentUserId = useSelector((state) => state.session.id);
    const currentUser = useSelector(
        (state) => state.entities.users[currentUserId]
    );

    return (
        <div className="post-details">
            <PostDetailsHeader photoFile={photoFile} photoUrl={photoUrl} />
            <Caption userImage={currentUser.imageUrl} photoUrl={photoUrl} />
        </div>
    );
}

const PostDetailsHeader = ({ photoFile, photoUrl }) => (
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
        {/* <button>
            Share
            </button> */}
        <Link to="/">Share</Link>
    </header>
);

const Caption = ({ userImage, photoUrl }) => (
    <section className="caption">
        <UserAvatar imageUrl={userImage} />
        <textarea placeholder="Write a caption..."></textarea>
        <img className="post-image" src={photoUrl} alt="" />
    </section>
);