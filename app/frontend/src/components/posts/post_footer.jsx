import React, { useState } from 'react';
import { likePost, unlikePost, savePost, unsavePost } from '../../redux/actions/post_actions';
import { useDispatch, useSelector } from 'react-redux';
import icons from '../shared/icons/svg-icons';
import { Link } from 'react-router-dom';
import { likeComment, unlikeComment } from '../../redux/actions/comment_actions';
import stateSelectors from '../../util/state_selectors';
import CommentLikeButton from './comment_like_button';

export default function PostFooter({ post, liked, comments, isSaved }) {
    const likedCommentIds = useSelector(stateSelectors.currentUsedLikedCommentIds());

    return (
        <div className="post-footer">
            <FooterIcons postId={post.id} liked={liked} isSaved={isSaved} />
            <PostLikes numLikes={post.num_likes} />
            <CaptionAndComments post={post} comments={comments} likedCommentIds={likedCommentIds} />
        </div>
    );
};

const FooterIcons = ({ postId, liked, isSaved }) => {
    const dispatch = useDispatch();

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

const CaptionAndComments = ({ post, comments, likedCommentIds }) => {
    return (
        <div className="caption-and-comments">
            <Caption post={post} />
            <FeedPostComments post={post} comments={comments} likedCommentIds={likedCommentIds} />
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

const FeedPostComments = ({ post, comments, likedCommentIds }) => {
    const numComments = comments.length;
    return (
        <div className="feed-post-comments">
            {numComments > 2 &&
                <Link className="comments-page-link" to={`/posts/${post.id}/comments`}>View all {numComments} comments</Link>}
            {comments.slice(0, 2).map(comment => (
                <FeedComment key={comment.id} comment={comment} post={post} likedCommentIds={likedCommentIds} />))}
        </div>
    );
};

const FeedComment = ({ comment, post, likedCommentIds }) => {
    const isLiked = likedCommentIds.includes(comment.id);
    const dispatch = useDispatch();

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
            {/* {
                isLiked ?
                    <button onClick={() => dispatch(unlikeComment(post.id, comment.id))}>
                        {icons.redHeart}
                    </button> :
                    <button onClick={() => dispatch(likeComment(post.id, comment.id))}>
                        {icons.unfilledHeart}
                    </button>
            } */}
            <CommentLikeButton postId={post.id} commentId={comment.id} />
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