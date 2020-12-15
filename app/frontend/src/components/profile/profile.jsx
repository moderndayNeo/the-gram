import React from 'react';
import BottomNav from '../shared/bottom_nav';
import { useSelector } from 'react-redux';
import stateSelectors  from '../../util/state_selectors';

export default function Profile() {
    const currentUser = useSelector(stateSelectors.currentUser())

    return (
        <div>
            <ProfileHeader />
            <main>
                {/* <CoreInfo /> */}
                {/* <Stats /> */}
                {/* <PostCollections /> */}

            </main>

            <BottomNav />
        </div>
    );
}

const ProfileHeader = () => (
    <header>
        Profile Header
    </header>
);