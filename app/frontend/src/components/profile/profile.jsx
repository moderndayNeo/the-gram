import React from 'react';
import BottomNav from '../shared/bottom_nav';
import { useSelector } from 'react-redux';
import stateSelectors from '../../util/state_selectors';
import { useParams } from 'react-router-dom';
import icons from '../shared/icons/svg-icons'

export default function Profile() {
    const currentUser = useSelector(stateSelectors.currentUser());
    const { userId } = useParams();

    if (currentUser.id == userId) {
        return <OwnProfile user={currentUser} />;
    }
    else {
        return <ForeignProfile />;
    }
}

const OwnProfile = ({user}) => {
    return (
        <div>
            <ProfileHeader user={user} />
            <main>
                {/* <CoreInfo /> */}
                {/* <Stats /> */}
                {/* <PostCollections /> */}

            </main>

            Own Profile
            <BottomNav />
        </div>
    );
};

const ForeignProfile = () => {
    return (
        <div>
            <header>
                {/* chevron icon */}
                {/* foreign usernme */}
            </header>

            <main>
                {/* <CoreInfo /> */}
                {/* <Stats /> */}
                {/* <PostCollections /> */}

            </main>

            Foreign Profile
            <BottomNav />
        </div>
    );
};


const ProfileHeader = ({user}) => (
    <header>
        {icons.gears}
        <h3>{user.username}</h3>
        {icons.discover}

    </header>
);
