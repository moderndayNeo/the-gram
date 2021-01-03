import React, { useState } from 'react';
import UserAvatar from '../shared/user_avatar';
import icons from '../shared/icons/svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import stateSelectors from '../../util/state_selectors';
import { Link, useHistory } from 'react-router-dom';
import PostFooter from './post_footer';
import { likePost } from '../../redux/actions/post_actions';
import { displayPostModal } from '../../redux/actions/ui_actions';


export default function Post({ post }) {
    const history = useHistory();

    React.useEffect(() => {
        if (!post) history.push('/');
    });

    let { id, author_id, image_url } = post;
    const author = useSelector(stateSelectors.userById(author_id));
    const comments = useSelector(stateSelectors.commentsByPostId(post.id));
    const savedPostIds = useSelector(stateSelectors.currentUserSavedPostIds());
    const likedPostIds = useSelector(stateSelectors.currentUserLikedPostIds());
    const isSaved = savedPostIds.includes(id);
    const isLiked = likedPostIds.includes(id);


    return (
        <article className="post">
            <PostHeader
                post={post}
                displayPostModal={displayPostModal}
                author={author}
            />
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

const PostHeader = ({ post, displayPostModal, author }) => {
    return (
        <header className="post-header">
            <UserAvatar imageUrl={author.image_url} />
            <div className="name-and-location">
                <Link to={`/users/${author.id}`}>
                    <p className="username-link">{author.username}</p>
                    {post.location && <p className="location">{post.location}</p>}
                </Link>
            </div>
            <button onClick={() => dispatch(displayPostModal(post.id))}>
                {icons.threeDots}
            </button>
        </header>
    );
};

const PostImage = ({ post, isLiked }) => {
    const dispatch = useDispatch();
    const [firstClicked, setFirstClicked] = useState(false);
    const [whiteHeartDisplayed, setWhiteHeartDisplayed] = useState(false);

    const handleClick = () => {
        if (firstClicked) {
            setWhiteHeartDisplayed(true);
            setTimeout(() => {
                setWhiteHeartDisplayed(false);
            }, 1000);
            if (!isLiked) dispatch(likePost(post.id));
        } else {
            setFirstClicked(true);
            setTimeout(() => {
                setFirstClicked(false);
            }, 200);
        }
    };

    return (
        <div className="image-container">
            <div
                className={`white-heart ${whiteHeartDisplayed && "displayed"}`}
            >{icons.filledHeart}</div>
            <img
                className="post-image" src={post.image_url || window.placeholderImgUrl}
                alt="post image"
                onClick={() => handleClick()}
            />
        </div>
    );
};
