import React from 'react';
import UserAvatar from '../shared/user_avatar';
import DynamicFollowButton from '../shared/dynamic_follow_button';
import { Link } from 'react-router-dom';


export default function UserLink({ user }) {
    return (
        <li className="user">
            <div className="container">
                <Link to={`/users/${user.id}`}>
                    <div className="image-and-text">
                        <UserAvatar imageUrl={user.image_url} />
                        <div className="text">
                            <p className="username-link">{user.username}</p>
                            <p className="text-after-username">{user.bio}</p>
                        </div>
                    </div>
                </Link>
                <DynamicFollowButton userId={user.id} />
            </div>
        </li>
    );
}