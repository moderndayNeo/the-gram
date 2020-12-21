import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import stateSelectors from '../../util/state_selectors';
import Post from './post';
import icons from '../shared/icons/svg-icons';
import BottomNav from '../shared/bottom_nav'

export default function PostShow() {
    const history = useHistory();
    const { postId } = useParams();
    const post = useSelector(stateSelectors.postById(postId));

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
            <BottomNav />
        </div>
    );
}
