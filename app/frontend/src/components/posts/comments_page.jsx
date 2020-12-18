import React, { useState } from 'react';
import UserAvatar from '../shared/user_avatar';
import { useSelector } from 'react-redux';
import stateSelectors from '../../util/state_selectors';
import icons from '../shared/icons/svg-icons';

export default function CommentsPage() {
    const currentUserImg = useSelector(stateSelectors.currentUserImageUrl());
    const [body, setBody] = useState('');

    return (
        <div className="comments-page">
            <header>
                {icons.chevron}
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
                    >Post</button>
                </form>
            </section>

            {/* {comments.map(comment => (
                <Comment key={comment.id} comment={comment} />
            ))} */}
        </div>
    );
}
