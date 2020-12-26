import React, { useState, useEffect } from 'react';
import BottomNav from '../shared/bottom_nav';
import { useSelector, useDispatch } from 'react-redux';
import stateSelectors from '../../util/state_selectors';
import { useParams, Link, useHistory } from 'react-router-dom';
import icons from '../shared/icons/svg-icons';
import UserAvatar from '../shared/user_avatar';
import { getFeed } from '../../redux/actions/post_actions';
import { logoutUser } from '../../redux/actions/session_actions';
import DynamicFollowButton from '../shared/dynamic_follow_button';
import PostCollections from './post_collections';
import LoadingPlaceholder from '../shared/loading_placeholder';

export default function Profile() {
    const dispatch = useDispatch();
    const currentUser = useSelector(stateSelectors.currentUser());
    const { userId } = useParams();
    let posts = useSelector(stateSelectors.allPosts());

    useEffect(() => {
        if (!posts.length) {
            dispatch(getFeed());
        }
    }, []);

    if (!posts.length) {
        return <LoadingPlaceholder />;
    } else if (currentUser.id == userId) {
        return <OwnProfile user={currentUser} posts={posts} />;
    }
    else {
        const otherUser = useSelector(stateSelectors.userById(userId));
        return <ForeignProfile user={otherUser} posts={posts} />;
    }
}

const OwnProfile = ({ user, posts }) => {
    const [optionsModal, setOptionsModal] = useState(false);

    return (
        <div className="own-profile">
            {
                optionsModal && <OptionsModal setOptionsModal={setOptionsModal} />
            }
            <ProfileHeader user={user} setOptionsModal={setOptionsModal} />
            <main>
                <ImageAndName user={user} ownProfile={true} />
                <Bio user={user} />
                <Stats user={user} />
                <PostCollections user={user} ownProfile={true} posts={posts} />
            </main>
            <BottomNav />
        </div>
    );
};

const OptionsModal = ({ setOptionsModal }) => {
    return (
        <div className="options-modal">
            <header>
                <div onClick={() => setOptionsModal(false)}>
                    {icons.cross}
                </div>
                <h3>Options</h3>
                <div className="blank-div"></div>
            </header>

            <div className="option-bar">
                <Link to="/signup" onClick={() => dispatch(logoutUser())}>
                    <p>Log Out</p>
                    <img src={window.greyChevron} alt="chevron icon" />
                </Link>
            </div>

        </div>
    );
};

const ForeignProfile = ({ user, posts }) => {
    const history = useHistory();

    if (user) {
        localStorage.setItem('devtUser', JSON.stringify(user));
    } else {
        let retrievedObject = localStorage.getItem('devtUser');
        user = JSON.parse(retrievedObject);
    }

    return (
        <div className="foreign-profile">
            <header>
                <div onClick={() => history.goBack()}>
                    {icons.chevron}
                </div>
                <p>
                    {user.username}
                </p>
                <div className="blank-div"></div>
            </header>

            <main>
                <ImageAndName user={user} ownProfile={false} />
                <Bio user={user} />
                <Stats user={user} />
                <PostCollections user={user} ownProfile={false} posts={posts} />
            </main>
            <BottomNav />
        </div>
    );
};

const ProfileHeader = ({ user, setOptionsModal }) => (
    <header>
        <div onClick={() => setOptionsModal(true)}>
            {icons.gears}
        </div>
        <h3>{user.username}</h3>
        <Link to={`/explore/people/suggested`}>
            {icons.discover}
        </Link>
    </header>
);

const ImageAndName = ({ user, ownProfile }) => {
    return (
        <div className="image-and-name">
            <UserAvatar imageUrl={user.image_url} />
            <section>
                <h2 className="username">{user.username}</h2>
                {
                    ownProfile ?
                        <button className="edit-button">Edit Profile</button> :
                        <div>
                            <DynamicFollowButton userId={user.id} />
                        </div>


                }
            </section>
        </div>
    );
};

const Bio = ({ user }) => (
    <div className="bio">
        <h1 className="name">{user.name}</h1>
        <span>{user.bio}</span>
    </div>
);

const Stats = ({ user }) => {
    return (
        <ul className="stats">
            <li className="stat">
                <p className="number">{user.num_posts}</p>
                <p className="name">posts</p>
            </li>
            <li className="stat">
                <Link to={`/users/${user.id}/followers`}>
                    <p className="number">{user.num_followers}</p>
                    <p className="name">followers</p>
                </Link>
            </li>
            <li className="stat">
                <Link to={`/users/${user.id}/following`}>
                    <p className="number">{user.num_following}</p>
                    <p className="name">following</p>
                </Link>
            </li>

        </ul>
    );
};



    // if (!posts.length) {
    //     let retrievedObject = localStorage.getItem('developmentPosts');
    //     posts = Object.values(JSON.parse(retrievedObject));
    // }

        // localStorage.setItem('devtUser', JSON.stringify(user))
    // if (!user) {
    //     let retrievedObject = localStorage.getItem('devtUser');
    //     user = JSON.parse(retrievedObject);
    // }