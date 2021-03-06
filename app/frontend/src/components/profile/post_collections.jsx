import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import stateSelectors from '../../util/state_selectors';
import { Link } from 'react-router-dom';
import icons from '../shared/icons/svg-icons';
import Post from '../posts/post';


export default function PostCollections({ isOwnProfile, user }) {
    const [selected, setSelected] = useState('posts');

    return (
        <div className="post-collections">
            <PostSelectorButtons
                isOwnProfile={isOwnProfile}
                selected={selected}
                setSelected={setSelected} />
            <SelectedPosts
                user={user}
                selected={selected}
            />
        </div>
    );
};

const PostSelectorButtons = ({ isOwnProfile, selected, setSelected }) => {
    return (
        <ul className="post-selector-buttons">
            <li className="selector" onClick={() => setSelected('posts')}>
                {selected === 'posts' ? icons.profilePostsBlue : icons.profilePostsGrey}
            </li>
            <li className="selector" onClick={() => setSelected('feed')}>
                <img src={selected === 'feed' ? window.profileFeedBlue : window.profileFeedGrey} alt="profile feed icon" />
            </li>
            {
                isOwnProfile &&
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

const SelectedPosts = ({ selected, user }) => {
    const contentDisplayed = () => {

        switch (selected) {
            case 'posts':
                let authoredPosts = useSelector(stateSelectors.postsByAuthorId(user.id));
                if (!authoredPosts.length) return <NoContentPlaceholder selected={selected} />;
                return <GridView posts={authoredPosts} />;
            case 'feed':
                authoredPosts = useSelector(stateSelectors.postsByAuthorId(user.id));
                if (!authoredPosts.length) return <NoContentPlaceholder selected={selected} />;
                return <FeedView posts={authoredPosts} />;
            case 'saved':
                const savedPosts = useSelector(stateSelectors.postsSavedByUser(user.id));
                if (!savedPosts.length) return <NoContentPlaceholder selected={selected} />;
                return <div>
                    <div className="saved-posts-message">Only you can see what you've saved</div>
                    <GridView posts={savedPosts} />
                </div>;
            case 'tagged':
                const taggedPosts = [];
                if (!taggedPosts.length) return <NoContentPlaceholder selected={selected} />;
                return <GridView
                    posts={taggedPosts}
                />;
        }
    };

    return (
        <article className="selected-posts">{contentDisplayed()}</article>
    );
};

const GridView = ({ posts }) => (
    <div className="grid-view">
        {posts.map(post => (
            <Link key={post.id} to={`/posts/${post.id}`}>
                <img src={post.image_url} alt="post" />
            </Link>))}
    </div>
);

const FeedView = ({ posts }) => (
    <ul>{posts.map(post => (
        <Post key={post.id} post={post} />))}
    </ul>
);

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
