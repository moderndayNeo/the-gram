import React from 'react';
import UserAvatar from '../shared/user_avatar';
import icons from '../shared/icons/svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import stateSelectors from '../../util/state_selectors';
import { Link } from 'react-router-dom';
import { likePost } from '../../redux/actions/post_actions';

export default function Post({ post }) {
    let { id, author_id, image_url } = post;
    const author = useSelector(stateSelectors.userById(author_id));
    const dispatch = useDispatch();

    return (
        <article className="post">
            <PostHeader author={author} />
            <PostImage id={id} imageUrl={image_url} />
            <PostFooter post={post} />
        </article>
    );
}

const PostHeader = ({ author }) => {
    return (
        <header className="post-header">
            <UserAvatar imageUrl={author.image_url} />
            <Link to={`/users/${author.id}`}>
                <p>{author.username}</p>
            </Link>
            {icons.threeDots}
        </header>
    );
};

const PostImage = ({ imageUrl }) => {
    return (
        <div className="image-container">
            <img className="post-image" src={imageUrl || window.placeholderImg} alt="post image" />
        </div>
    );
};

const PostFooter = ({ post }) => {
    return (
        <div className="post-footer">
            <FooterIcons postId={post.id} />
            <PostLikes numLikes={post.num_likes} />
            <CaptionAndComments post={post} />
        </div>
    );
};

const FooterIcons = ({ postId }) => (
    <div className="footer-icons">
        <div className="icons-left">
            <div onClick={() => dispatch(likePost(postId))}>

                {icons.unfilledHeart}
            </div>
            {icons.comment}
            {icons.paperPlane}
        </div>
        {icons.unfilledSave}
    </div>
);

const CaptionAndComments = ({ post }) => (
    <div className="caption-and-comments">
        <div className="caption">
            <span className="author">{post.author_username}</span>
            <p> {post.caption}</p>
        </div>
    </div>
);

const PostLikes = ({ numLikes }) => {
    let content = numLikes === 0 ?
        "Be the first to like this" :
        numLikes === 1 ?
            "1 Like" : `${numLikes} likes`;

    return (
        < div className="post-likes" > { content}</div>
    );
};

