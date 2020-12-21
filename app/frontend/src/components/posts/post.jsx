import React, { useState } from 'react';
import UserAvatar from '../shared/user_avatar';
import icons from '../shared/icons/svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import stateSelectors from '../../util/state_selectors';
import { Link } from 'react-router-dom';
import { likePost, unlikePost, savePost, unsavePost } from '../../redux/actions/post_actions';

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

const PostFooter = ({ post, liked, comments, isSaved }) => {
    return (
        <div className="post-footer">
            <FooterIcons postId={post.id} liked={liked} isSaved={isSaved} />
            <PostLikes numLikes={post.num_likes} />
            <CaptionAndComments post={post} comments={comments} />
        </div>
    );
};

const FooterIcons = ({ postId, liked, isSaved }) => {
    return (
        <div className="footer-icons">
            <div className="icons-left">
                {
                    liked ?
                        <div onClick={() => dispatch(unlikePost(postId))}>
                            {icons.redHeart}
                        </div> :
                        <div onClick={() => dispatch(likePost(postId))}>
                            {icons.unfilledHeart}
                        </div>
                }

                <Link to={`/posts/${postId}/comments`}>
                    {icons.comment}
                </Link>
                {icons.paperPlane}
            </div>
            <SaveIcon isSaved={isSaved} postId={postId} />
        </div>
    );
};

const CaptionAndComments = ({ post, comments }) => {
    return (
        <div className="caption-and-comments">
            <Caption post={post} />
            <FeedPostComments post={post} comments={comments} />
            <DatePosted post={post} />
        </div>
    );
};

const Caption = ({ post }) => {
    const captionLength = post.caption.length;
    const [captionRevealed, setCaptionRevealed] = useState(false);

    const captionDisplayed = () => {
        if (captionLength <= 25) {
            return <p>{post.caption}</p>;
        } else if (captionRevealed) {
            return <p>{post.caption}</p>;
        } else {
            return <div className="reveal-caption">
                <p>{post.caption.slice(0, 25)}</p>...
                <button className="expand-caption" onClick={() => setCaptionRevealed(true)}>more</button>
            </div>;
        }
    };

    return (
        <div className="caption">
            <Link className="username-link" to={`/users/${post.author_id}`}>{post.author_username}</Link>
            {captionDisplayed()}
        </div>
    );
};

const FeedPostComments = ({ post, comments }) => {
    const numComments = comments.length;
    return (
        <div className="feed-post-comments">
            {numComments > 2 &&
                <Link className="comments-page-link" to={`/posts/${post.id}/comments`}>View all {numComments} comments</Link>}
            {comments.slice(0, 2).map(comment => (
                <FeedComment key={comment.id} comment={comment} />))}
        </div>
    );
};

const FeedComment = ({ comment }) => {
    return (
        <div className="feed-comment">
            <div className="text">
                <Link
                    to={`/users/${comment.author_id}`}
                    className="username-link">
                    {comment.author_username}
                </Link>
                <p>{comment.body}</p>
            </div>
            {icons.unfilledHeart}
        </div>
    );
};

const PostLikes = ({ numLikes }) => {
    let content = numLikes === 0 ?
        "Be the first to like this" :
        numLikes === 1 ?
            "1 Like" : `${numLikes} likes`;

    return (
        < div className="post-likes" > { content}</div>
    );
};

const DatePosted = ({ post }) => (
    <div className="date-posted">
        <p >{post.time_ago.toUpperCase()} AGO</p>
    </div>
);

const SaveIcon = ({ isSaved, postId }) => {
    const buttonDisplayed = isSaved ?
        <button onClick={() => unsavePost(postId)}>{icons.filledSave}</button> :
        <button onClick={() => savePost(postId)}>{icons.unfilledSave}</button>;

    return buttonDisplayed;
};