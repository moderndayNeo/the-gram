import React, { useState } from 'react';
import UserAvatar from '../shared/user_avatar';
import { useSelector, useDispatch } from 'react-redux';
import stateSelectors from '../../util/state_selectors';
import icons from '../shared/icons/svg-icons';
import { useParams, useHistory } from 'react-router-dom';
import { commentOnPost } from '../../redux/actions/post_actions';


export default function CommentsPage() {
    const currentUserImg = useSelector(stateSelectors.currentUserImageUrl());
    const [body, setBody] = useState('');
    const { postId } = useParams();
    const history = useHistory()

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(commentOnPost(postId, {body}));
    };

    return (
        <div className="comments-page">
            <header>
                <div onClick={() => history.goBack()}>
                    {icons.chevron}
                </div>
                <h3>Comments</h3>
                {icons.paperPlane}
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

            {/* {comments.map(comment => (
                <Comment key={comment.id} comment={comment} />
            ))} */}
        </div>
    );
}
