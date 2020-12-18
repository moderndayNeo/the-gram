import React from 'react';
import UserAvatar from '../shared/user_avatar';
import { useSelector } from 'react-redux';
import stateSelectors from '../../util/state_selectors';

export default function CommentsPage() {
    const currentUserImg = useSelector(stateSelectors.currentUserImageUrl());

    return (
        <div className="comments-page">
            <header>
                {icons.chevron}
                <h2>Comments</h2>
                {icons.paperPlane}
            </header>

            <section className="form-container">
                <UserAvatar imageUrl={currentUserImg} />
                <form action=""></form>
            </section>


            Comments Page
        </div>
    );
}
