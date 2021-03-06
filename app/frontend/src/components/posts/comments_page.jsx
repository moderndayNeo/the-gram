import React, { useState, useEffect } from 'react';
import UserAvatar from '../shared/user_avatar';
import { useSelector, useDispatch } from 'react-redux';
import stateSelectors from '../../util/state_selectors';
import icons from '../shared/icons/svg-icons';
import { useParams, useHistory, Link } from 'react-router-dom';
import { commentOnPost } from '../../redux/actions/comment_actions';
import BottomNav from '../shared/bottom_nav';
import CommentLikeButton from './comment_like_button';
import { displayCommentModal } from '../../redux/actions/ui_actions';
import { modifyTime } from '../../util/helpers';

export default function CommentsPage() {
    const dispatch = useDispatch();
    const currentUserImg = useSelector(stateSelectors.currentUserImageUrl());
    const [body, setBody] = useState('');
    const { postId } = useParams();
    const history = useHistory();
    const comments = useSelector(stateSelectors.commentsByPostId(postId));

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(commentOnPost(postId, { body }))
            .then(() => setBody(''));
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="comments-page">
            <header>
                <div onClick={() => history.goBack()}>
                    {icons.chevron}
                </div>
                <h3>Comments</h3>
                <button onClick={() => dispatch(displayCommentModal(postId))}>
                    {icons.paperPlane}
                </button>
            </header>

            <section className="form-container">
                <UserAvatar imageUrl={currentUserImg} />
                <form>
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />

                    <button
                        disabled={body.length === 0}
                        type="submit"
                        onClick={(e) => handleSubmit(e)}
                    >Post
                    </button>
                </form>
            </section>

            {comments.map(comment => (
                <Comment key={comment.id} comment={comment} postId={postId} />
            ))}

            <BottomNav />
        </div>
    );
}

const Comment = ({ comment, postId }) => {
    return (
        <li className="comment-container">
            <div className="comment-elements">
                <UserAvatar imageUrl={window.noAvatarImg} />
                <TextBlock comment={comment} />
                <CommentLikeButton commentId={comment.id} postId={postId} />
            </div>
        </li>
    );
};

const TextBlock = ({ comment }) => {
    const timeAgo = modifyTime(comment.time_ago);

    return (
        <div className="text-block">
            <div className="author-and-body">
                <Link className="username-link" to={`/users/${comment.author_id}`}>{comment.author_username}</Link>
                <p className="body text-after-username">{comment.body}</p>
            </div>
            <div className="comment-stats">
                <p className="comment-time-ago">{timeAgo}</p>
                {
                    comment.num_likes > 0 &&
                    <p className="comment-likes">{comment.num_likes} likes</p>
                }
                {/* <p className="comment-num-replies">Reply</p> */}
            </div>
        </div>
    );
};
