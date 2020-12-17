import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import stateSelectors from '../../util/state_selectors';
import Post from './post';
import icons from '../shared/icons/svg-icons';

export default function PostShow() {
    const history = useHistory();
    const { postId } = useParams();
    const post = useSelector(stateSelectors.postById(postId));

    let post1 = {
        id: 18,
        author_id: 28,
        author_username: "guest",
        caption: "purpleom",
        id: 18,
        image_url: "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBFUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2e2edffeceefc48af51bcc158c6ba14f34f72ab7/purpleom%20copy.jpg",
        location: null
    };

    return (
        <div className="post-show">
            <header>
                <div onClick={() => history.goBack()}>
                    {icons.chevron}
                </div>
                <h3>Photo</h3>
                <div></div>
            </header>
            <Post post={post} />
        </div>
    );
}
