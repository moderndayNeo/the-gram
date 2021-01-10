import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import stateSelectors from '../../util/state_selectors';
import Post from './post';
import icons from '../shared/icons/svg-icons';
import BottomNav from '../shared/bottom_nav';
import LoadingPlaceholder from '../shared/loading_placeholder';
import { getPost } from '../../redux/actions/post_actions';

export default function PostShow() {
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const dispatch = useDispatch();
    const { postId } = useParams();
    const post = useSelector(stateSelectors.postById(postId));
    const author = post ? useSelector(stateSelectors.userById(post.author_id)) : null;

    React.useEffect(() => {
        if (!post || !author) {
            setLoading(true);
            dispatch(getPost(postId))
                .then(() => setLoading(false));
        } else {
            setLoading(false);
        }
    });

    return (
        <div className="post-show">
            <header>
                <div onClick={() => history.goBack()}>
                    {icons.chevron}
                </div>
                <h3>Photo</h3>
                <div></div>
            </header>

            {!author ? <LoadingPlaceholder /> : <Post post={post} />}
            <BottomNav />
        </div>
    );
}
