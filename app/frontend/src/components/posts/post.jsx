import React from 'react';
import UserAvatar from '../shared/user_avatar';
import icons from '../shared/icons/svg-icons';
import { useSelector } from 'react-redux';
import stateSelectors from '../../util/state_selectors';
import { Link } from 'react-router-dom';
import PostFooter from './post_footer';

export default function Post({ post }) {
    let { id, author_id, image_url, liker_ids } = post;
    const author = useSelector(stateSelectors.userById(author_id));
    const currentUserId = useSelector(stateSelectors.currentUserId());
    const liked = liker_ids.includes(currentUserId);
    const comments = useSelector(stateSelectors.commentsByPostId(post.id));
    const savedPostIds = useSelector(stateSelectors.currentUserSavedPostIds());
    const isSaved = savedPostIds.includes(id); // check data types here

    return (
        <article className="post">
            <PostHeader author={author} />
            <PostImage id={id} imageUrl={image_url} />
            <PostFooter
                post={post}
                liked={liked}
                comments={comments}
                isSaved={isSaved}
            />
        </article>
    );
}

const PostHeader = ({ author }) => {
    return (
        <header className="post-header">
            <UserAvatar imageUrl={author.image_url} />
            <div className="author-name">
                <Link to={`/users/${author.id}`}>
                    {author.username}
                </Link>
            </div>
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
