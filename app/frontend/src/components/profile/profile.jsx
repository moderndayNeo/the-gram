import React from 'react';
import BottomNav from '../shared/bottom_nav';

export default function Profile() {
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