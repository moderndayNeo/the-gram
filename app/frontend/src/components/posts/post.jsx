import React from 'react';
import UserAvatar from '../shared/user_avatar';
import icons from '../shared/icons/svg-icons';
import { useSelector } from 'react-redux';

export default function Post({ post: { id, author_id, image_url } }) {
    const author = useSelector(state => state.entities.users[author_id]);
    const authorImage = author.image_url;

    return (
        <article className="post">
            <PostHeader author={author.username} authorImage={authorImage} />
            <PostImage id={id} imageUrl={image_url} />
            <PostFooter />
        </article>
    );
}


const PostHeader = ({ author, authorImage }) => {
    return (
        <header className="post-header">
            <UserAvatar imageUrl={authorImage} />
            <p>{author}</p>
            {icons.threeDots}
        </header>
    );
};

const PostImage = ({ imageUrl }) => {

    return (
        <div className="image-container">
            <img className="post-image" src={imageUrl || window.placeholderImg} alt="post image" />
        </div>
    );
};

const PostFooter = () => {
    return (
        <div className="post-footer">
            Footer
        </div>
    );
};