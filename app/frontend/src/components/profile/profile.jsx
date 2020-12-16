import React from 'react';
import BottomNav from '../shared/bottom_nav';
import { useSelector } from 'react-redux';
import stateSelectors from '../../util/state_selectors';
import { useParams } from 'react-router-dom';
import icons from '../shared/icons/svg-icons';
import UserAvatar from '../shared/user_avatar';

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


const OwnProfile = ({ user }) => {
    return (
        <div className="own-profile">
            <ProfileHeader user={user} />
            <main>
                <ImageAndName user={user} />
                <Bio user={user} />
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


const ProfileHeader = ({ user }) => (
    <header>
        {icons.gears}
        <h3>{user.username}</h3>
        {icons.discover}

    </header>
);

const Bio = ({user}) => (
    <div className="bio">
        <h1 className="name">{user.name}</h1>
        {/* <span>{user.bio}</span> */}
        <span>Bodybuilder</span>
    </div>
)


const ImageAndName = ({ user }) => {
    return (
        <div className="image-and-name">
            <UserAvatar imageUrl={user.image_url} />
            <section>
                <h2 className="username">{user.username}</h2>
                <button>Edit Profile</button>
            </section>
        </div>
    );
};