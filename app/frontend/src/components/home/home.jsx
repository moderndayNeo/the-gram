import React from 'react';
import { useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/session_actions';
import { useDispatch } from 'react-redux';
import ImageForm from '../user/image_form';
import Feed from '../posts/feed';
import PostForm from '../posts/post_form';
import HomeTopNav from './home_top_nav'
import BottomNav from '../shared/bottom_nav'


export default function Home() {
    const dispatch = useDispatch();

    const currentUserId = useSelector(state => state.session.id);
    const currentUser = useSelector(state => state.entities.users[currentUserId]);
    const userImageUrl = currentUser.image_url;


    const currentUserShowPage = () => <div>
        {/* <button onClick={() => dispatch(logoutUser())}>Log Out</button> */}
        {/* <ImageForm currentUserId={currentUserId} /> */}
        <Feed />
        {/* <PostForm /> */}


    </div>;

    const loadingComponent = () => <div>Loading...</div>;



    return (
        <section>
            <HomeTopNav />
        {
        currentUser ? currentUserShowPage() : loadingComponent()
        }


        <BottomNav />
        </section>
    );
}




