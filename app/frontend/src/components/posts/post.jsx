import React from 'react';
import UserAvatar from '../shared/user_avatar';
import icons from '../shared/icons/svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import stateSelectors from '../../util/state_selectors';
import { Link } from 'react-router-dom';
import { likePost, unlikePost } from '../../redux/actions/post_actions';

export default function Post({ post }) {
    let { id, author_id, image_url, liker_ids } = post;
    const author = useSelector(stateSelectors.userById(author_id));
    const currentUserId = useSelector(stateSelectors.currentUserId());    
    const liked = liker_ids.includes(currentUserId);

    return (
        <article className="post">
            <PostHeader author={author} />
            <PostImage id={id} imageUrl={image_url} />
            <PostFooter post={post} liked={liked} />
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

const PostFooter = ({ post, liked }) => {
    return (
        <div className="post-footer">
            <FooterIcons postId={post.id} liked={liked} />
            <PostLikes numLikes={post.num_likes} />
            <CaptionAndComments post={post} />
        </div>
    );
};

const FooterIcons = ({ postId, liked }) => {
    return (
        <div className="footer-icons">
            <div className="icons-left">
                {
                    liked ?
                        <div onClick={() => dispatch(unlikePost(postId))}>
                            {icons.redHeart}
                        </div> :
                        <div onClick={() => dispatch(likePost(postId))}>
                            {icons.unfilledHeart}
                        </div>
                }
                
                <Link to={`/posts/${postId}/comments`}>
                {icons.comment}
                </Link>
                {icons.paperPlane}
            </div>
            {icons.unfilledSave}
        </div>
    );
};

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

