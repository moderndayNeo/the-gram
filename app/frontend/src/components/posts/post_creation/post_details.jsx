import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import icons from '../../shared/icons/svg-icons';
import UserAvatar from '../../shared/user_avatar';
import { useSelector } from 'react-redux';

export default function PostDetails() {
    const location = useLocation();
    const postImageUrl = location.state ? location.state.photoUrl : window.placeholderImg;
    const postImageFile = location.state ? location.state.photoFile : null;
    const currentUserId = useSelector((state) => state.session.id);
    const currentUser = useSelector(
        (state) => state.entities.users[currentUserId]
    );

    return (
        <div className="post-details">
            <PostDetailsHeader />
            <Caption userImage={currentUser.imageUrl} postImageUrl={postImageUrl} />
        </div>
    );
}


const PostDetailsHeader = () => (
    <header>
        <Link to="/create/style">
            {icons.chevron}
        </Link>
        <h3>New Post</h3>
        {/* <button>
            Share
            </button> */}
        <Link to="/">Share</Link>
    </header>
);

const Caption = ({ userImage, postImageUrl }) => (
    <section className="caption">
        <UserAvatar imageUrl={userImage} />
        <textarea placeholder="Write a caption..."></textarea>
        <img className="post-image" src={postImageUrl} alt="" />
    </section>
);