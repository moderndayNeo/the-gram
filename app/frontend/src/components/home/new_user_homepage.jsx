import React from 'react';
import SuggestedUsersList from '../shared/suggested_users_list';

export default function NewUserHomepage() {
    return (
        <div className="new-user-homepage">
            <header>
                <h3>Welcome to The Gram</h3>
                <p>When you follow people, you'll see the photos and videos they post here</p>
            </header>

            <h4 className="suggested-title">Suggested</h4>
            <SuggestedUsersList />
        </div>
    );
}


