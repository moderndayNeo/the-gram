import React, { useState, useEffect } from 'react';
import BottomNav from '../shared/bottom_nav';
import { useSelector, useDispatch } from 'react-redux';
import stateSelectors from '../../util/state_selectors';
import { useParams, Link, useHistory } from 'react-router-dom';
import icons from '../shared/icons/svg-icons';
import UserAvatar from '../shared/user_avatar';
import Post from '../posts/post';
import { getFeed } from '../../redux/actions/post_actions';

export default function Profile() {
    const dispatch = useDispatch();
    const currentUser = useSelector(stateSelectors.currentUser());
    const { userId } = useParams();
    let posts = useSelector(stateSelectors.postsByAuthorId(userId));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!posts.length) {
            setLoading(true);
            dispatch(getFeed())
                .then(() => setLoading(false));
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    } else if (currentUser.id == userId) {
        return <OwnProfile user={currentUser} posts={posts} />;
    }
    else {
        const otherUser = useSelector(stateSelectors.userById(userId));
        return <ForeignProfile user={otherUser} posts={posts} />;
    }
}

const OwnProfile = ({ user, posts }) => {
    return (
        <div className="own-profile">
            <ProfileHeader user={user} />
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

const ForeignProfile = ({ user, posts }) => {
    const history = useHistory();

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

const ProfileHeader = ({ user }) => (
    <header>
        {icons.gears}
        <h3>{user.username}</h3>
        {icons.discover}
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
                        <button>Edit Profile</button> :
                        <div>
                            {/* <p>Message</p>
                            <p>Following symbol</p>
                            <p>Dropdown symbol</p> */}
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
        ...user,
        num_followers: 11,
        num_following: 14
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

const PostCollections = ({ ownProfile, posts }) => {
    const [selected, setSelected] = useState('posts');

    return (
        <div className="post-collections">
            <PostSelectorButtons
                ownProfile={ownProfile}
                selected={selected}
                setSelected={setSelected} />
            <SelectedPosts
                posts={posts}
                selected={selected} />
        </div>
    );
};

const PostSelectorButtons = ({ ownProfile, selected, setSelected }) => {
    return (
        <ul className="post-selector-buttons">
            <li className="selector" onClick={() => setSelected('posts')}>
                {selected === 'posts' ? icons.profilePostsBlue : icons.profilePostsGrey}
            </li>
            <li className="selector" onClick={() => setSelected('feed')}>
                <img src={selected === 'feed' ? window.profileFeedBlue : window.profileFeedGrey} alt="profile feed icon" />
            </li>
            {
                ownProfile &&
                <li className="selector" onClick={() => setSelected('saved')}>
                    {selected === 'saved' ? icons.profileSavedBlue : icons.profileSavedGrey}
                </li>
            }
            <li className="selector" onClick={() => setSelected('tagged')}>
                {selected === 'tagged' ? icons.profileTaggedBlue : icons.profileTaggedGrey}
            </li>

        </ul>
    );
};

const SelectedPosts = ({ posts, selected }) => {
    // console.log(selected);

    return (
        <article className="selected-posts">
            {['posts', 'saved', 'tagged'].includes(selected) ?
                <GridView posts={posts} selected={selected} /> :
                <FeedView posts={posts} />
            }
        </article>
    );
};

const GridView = ({ posts, selected }) => {
    return posts.length > 0 ?
        <div className="grid-view">
            {posts.map(post => (
                <Link key={post.id} to={`/posts/${post.id}`}>
                    <img src={post.image_url} alt="post" />
                </Link>))}
        </div> :
        <NoContentPlaceholder selected={selected} />;
};

const FeedView = ({ posts }) => {
    return posts.length > 0 ?
        <ul>{posts.map(post => (
            <Post key={post.id} post={post} />))}
        </ul> :
        <NoContentPlaceholder selected='feed' />;
};

const NoContentPlaceholder = ({ selected }) => {
    const placeholders = {
        'posts': {
            message: "When you make posts, they'll appear here",
            icon: icons.profilePostsGrey
        },
        'feed': {
            message: "When you save posts, they'll appear here",
            icon: <img src={window.profileFeedGrey} alt="" />
        },
        'saved': {
            message: "When you save posts, they'll appear here",
            icon: icons.profileSavedGrey
        },
        'tagged': {
            message: "When you're tagged in posts, they'll appear here",
            icon: icons.profileTaggedGrey
        },
    };

    return <div className="no-content-placeholder">
        {placeholders[selected].icon}
        <p>{placeholders[selected].message}</p>
    </div>;
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