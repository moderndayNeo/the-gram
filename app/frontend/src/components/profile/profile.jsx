import React, { useState, useEffect } from 'react';
import BottomNav from '../shared/bottom_nav';
import { useSelector, useDispatch } from 'react-redux';
import stateSelectors from '../../util/state_selectors';
import { useParams, Link, useHistory } from 'react-router-dom';
import icons from '../shared/icons/svg-icons';
import UserAvatar from '../shared/user_avatar';
import DynamicFollowButton from '../shared/dynamic_follow_button';
import PostCollections from './post_collections';
import LoadingPlaceholder from '../shared/loading_placeholder';
import OptionsModal from './options_modal';
import { fetchUserProfileData } from '../../redux/actions/user_actions';

export default function Profile() {
    const dispatch = useDispatch();
    const currentUser = useSelector(stateSelectors.currentUser());
    const posts = useSelector(stateSelectors.allPosts());
    const { userId } = useParams();

    useEffect(() => {
        // if (!posts.length) {

        // dispatch(getFeed());
        // }
        dispatch(fetchUserProfileData(userId));
    }, []);

    return <SelectedProfile userId={userId} currentUser={currentUser} posts={posts} />;
}

const SelectedProfile = ({ userId, currentUser, posts }) => {
    if (!posts.length) {
        return <LoadingPlaceholder />;
    } else if (currentUser.id == userId) {
        return <OwnProfile user={currentUser} />;
    }
    else {
        const otherUser = useSelector(stateSelectors.userById(userId));
        return <ForeignProfile user={otherUser} />;
    }

};

const OwnProfile = ({ user }) => {
    const [optionsModal, setOptionsModal] = useState(false);

    return (
        <div className="own-profile">
            {
                optionsModal && <OptionsModal setOptionsModal={setOptionsModal} />
            }
            <ProfileHeader user={user} setOptionsModal={setOptionsModal} />
            <main>
                <ImageAndName user={user} isOwnProfile={true} />
                <Bio user={user} />
                <Stats user={user} />
                <PostCollections isOwnProfile={true} user={user} />
            </main>
            <BottomNav />
        </div>
    );
};

const ForeignProfile = ({ user }) => {
    const history = useHistory();

    return (
        <div className="foreign-profile">
            <header>
                <div onClick={() => history.goBack()}>
                    {icons.chevron}
                </div>
                <p>{user.username}</p>
                <div className="blank-div"></div>
            </header>

            <main>
                <ImageAndName user={user} isOwnProfile={false} />
                <Bio user={user} />
                <Stats user={user} />
                <PostCollections isOwnProfile={false} user={user} />
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

const ImageAndName = ({ user, isOwnProfile }) => {
    return (
        <div className="image-and-name">
            <UserAvatar imageUrl={user.image_url} />
            <section>
                <h2 className="username">{user.username}</h2>
                {
                    isOwnProfile ?
                        <Link to='/accounts/edit' className="edit-button">
                            Edit Profile
                    </Link>
                        :
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