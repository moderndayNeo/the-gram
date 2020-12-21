import React, { useState, useEffect } from 'react';
import BottomNav from '../shared/bottom_nav';
import { useSelector, useDispatch } from 'react-redux';
import stateSelectors from '../../util/state_selectors';
import { useParams, Link, useHistory } from 'react-router-dom';
import icons from '../shared/icons/svg-icons';
import UserAvatar from '../shared/user_avatar';
import Post from '../posts/post';
import { getFeed } from '../../redux/actions/post_actions';
import { logoutUser } from '../../redux/actions/session_actions';
import FollowButton from '../shared/follow_button';
import FollowingButton from '../shared/following_button';
import PostCollections from './post_collections'

export default function Profile() {
    const dispatch = useDispatch();
    const currentUser = useSelector(stateSelectors.currentUser());
    const { userId } = useParams();
    // let posts = useSelector(stateSelectors.postsByAuthorId(userId));
    let posts = useSelector(stateSelectors.allPosts());
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     if (!posts.length) {
    //         setLoading(true);
    //         dispatch(getFeed())
    //             .then(() => setLoading(false));
    //     }
    // }, []);

    if (loading) {
        return <div>Loading...</div>;
    } else if (currentUser.id == userId) {
        return <OwnProfile user={currentUser} posts={posts} />;
    }
    else {
        const otherUser = useSelector(stateSelectors.userById(userId));
        const isFollowing = currentUser.followed_user_ids.includes(parseInt(userId));
        return <ForeignProfile user={otherUser} posts={posts} isFollowing={isFollowing} />;
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

const ForeignProfile = ({ user, posts, isFollowing }) => {
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
                <ImageAndName user={user} ownProfile={false} isFollowing={isFollowing} />
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
        {icons.discover}
    </header>
);

const ImageAndName = ({ user, ownProfile, isFollowing }) => {
    return (
        <div className="image-and-name">
            <UserAvatar imageUrl={user.image_url} />
            <section>
                <h2 className="username">{user.username}</h2>
                {
                    ownProfile ?
                        <button className="edit-button">Edit Profile</button> :
                        isFollowing ?
                            <div>
                                <FollowingButton userId={user.id} />
                            </div> :
                            <div>
                                <FollowButton userId={user.id} />
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
    let userData = {
        ...user
    };

    const statTypes = ['posts', 'followers', 'following'];
    const userInfo = ['num_posts', 'num_followers', 'num_following'];

    return (
        <ul className="stats">
            {
                statTypes.map((statName, idx) => (
                    <li key={idx} className="stat">
                        <p className="number">{userData[userInfo[idx]]}</p>
                        <p className="name">{statName}</p>
                    </li>
                ))
            }
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