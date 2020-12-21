import React from 'react';
import stateSelectors from '../../util/state_selectors';
import { likeComment, unlikeComment } from '../../redux/actions/comment_actions';
import { useSelector, useDispatch } from 'react-redux';
import icons from '../shared/icons/svg-icons';

export default function CommentLikeButton({ postId, commentId }) {
    const likedCommentIds = useSelector(stateSelectors.currentUsedLikedCommentIds());
    const isLiked = likedCommentIds.includes(commentId);
    const dispatch = useDispatch();

    const buttonDisplayed = () => {
        return isLiked ?
            <button onClick={() => dispatch(unlikeComment(postId, commentId))}>
                {icons.redHeart}
            </button> :
            <button onClick={() => dispatch(likeComment(postId, commentId))}>
                {icons.unfilledHeart}
            </button>;
    };

    return buttonDisplayed();
}