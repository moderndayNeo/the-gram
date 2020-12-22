import React, { useState } from 'react';
import UserAvatar from '../shared/user_avatar';
import icons from '../shared/icons/svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import stateSelectors from '../../util/state_selectors';
import { Link } from 'react-router-dom';
import PostFooter from './post_footer';
import { likePost, unlikePost } from '../../redux/actions/post_actions';


export default function Post({ post }) {
    let { id, author_id, image_url } = post;
    const author = useSelector(stateSelectors.userById(author_id));
    const comments = useSelector(stateSelectors.commentsByPostId(post.id));
    const savedPostIds = useSelector(stateSelectors.currentUserSavedPostIds());
    const likedPostIds = useSelector(stateSelectors.currentUserLikedPostIds());
    const isSaved = savedPostIds.includes(id);
    const isLiked = likedPostIds.includes(id);

    return (
        <article className="post">
            <PostHeader author={author} />
            <PostImage
                id={id}
                imageUrl={image_url}
                post={post}
                isLiked={isLiked}
            />
            <PostFooter
                post={post}
                isLiked={isLiked}
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

const PostImage = ({ post, isLiked }) => {
    const [firstClicked, setFirstClicked] = useState(false);
    const dispatch = useDispatch();

    const toggleLiked = () => {
        return isLiked ?
            dispatch(unlikePost(post.id)) :
            dispatch(likePost(post.id));
    };

    const handleClick = () => {
        if (firstClicked) {
            toggleLiked();
        } else {
            setFirstClicked(true);
            setTimeout(() => {
                setFirstClicked(false);
            }, 200);
        }
    };

    return (
        <div className="image-container">
            <img
                className="post-image" src={post.image_url || window.placeholderImg}
                alt="post image"
                onClick={() => handleClick()}
            />
        </div>
    );
};
