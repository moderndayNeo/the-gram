import React, { useState } from 'react';
import { likePost, unlikePost, savePost, unsavePost } from '../../redux/actions/post_actions';
import { useDispatch } from 'react-redux';
import icons from '../shared/icons/svg-icons';
import { Link } from 'react-router-dom';
import CommentLikeButton from './comment_like_button';
import { displayDirectMessageModal } from '../../redux/actions/ui_actions';


export default function PostFooter({ post, isLiked, comments, isSaved }) {

    return (
        <div className="post-footer">
            <FooterIcons postId={post.id} isLiked={isLiked} isSaved={isSaved} />
            <PostLikes numLikes={post.num_likes} />
            <CaptionAndComments post={post} comments={comments} />
        </div>
    );
};

const FooterIcons = ({ postId, isLiked, isSaved }) => {
    const dispatch = useDispatch();

    return (
        <div className="footer-icons">
            <div className="icons-left">
                {
                    isLiked ?
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
                <button onClick={() => dispatch(displayDirectMessageModal())}>
                    {icons.paperPlane}
                </button>
            </div>
            <SaveIcon isSaved={isSaved} postId={postId} />
        </div>
    );
};

const CaptionAndComments = ({ post, comments, }) => {
    return (
        <div className="caption-and-comments">
            <Caption post={post} />
            <FeedPostComments post={post} comments={comments} />
            <DatePosted post={post} />

            {/* <div 
            className="icon-test"
            style={{"backgroundImage":`url(${window.postStyleSprites})`}}
            >Icon test</div> */}

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

const FeedPostComments = ({ post, comments, }) => {
    const numComments = comments.length;
    return (
        <div className="feed-post-comments">
            {numComments > 2 &&
                <Link className="comments-page-link" to={`/posts/${post.id}/comments`}>View all {numComments} comments</Link>}
            {comments.slice(0, 2).map(comment => (
                <FeedComment key={comment.id} comment={comment} post={post} />))}
        </div>
    );
};

const FeedComment = ({ comment, post, }) => {

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