import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import icons from '../shared/icons/svg-icons';
import BottomNav from '../shared/bottom_nav';
import UserAvatar from '../shared/user_avatar';
import stateSelectors from '../../util/state_selectors';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../redux/actions/user_actions';
import { showEditProfilePopup } from '../../redux/actions/ui_actions';
import NewPostButton from '../shared/new_post_button';

export default function EditProfile() {
    const dispatch = useDispatch()

    const history = useHistory();
    const currentUser = useSelector(stateSelectors.currentUser());
    const [hasChanged, setHasChanged] = useState(false);
    const isGuestAccount = currentUser.username === 'guest';
    const [info, setInfo] = useState({
        name: currentUser.name,
        username: currentUser.username,
        bio: currentUser.bio,
        email: currentUser.email,
    });

    const updateValue = type => {
        return e => {
            setInfo({ ...info, [type]: e.currentTarget.value });
            setHasChanged(true);
        };
    };

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(updateUser(currentUser.id, info))
            .then(() =>
                dispatch(showEditProfilePopup()));

        setHasChanged(false);
    };

    return (
        <div className="edit-profile scroll-page">
            <header className="fixed-header">
                <div onClick={() => history.goBack()}>
                    {icons.chevron}
                </div>
                <h3>Edit Profile</h3>
                <div></div>
            </header>

            <main>
                <div className="edit-image">
                    <UserAvatar imageUrl={currentUser.image_url} />
                    <div className="text">
                        <h3>{currentUser.username}</h3>
                        <NewPostButton
                            disabled
                            text="Change Profile Photo"
                            imageFor="profile"
                            onClick={(e) => preventDefault(e)}
                        />
                        {isGuestAccount &&
                            <p className="subtext">The guest account may not be edited.</p>
                        }

                    </div>
                </div>

                <form>
                    <section>
                        <label>Name</label>
                        <input className="grey-input" type="text" value={info.name} placeholder="Full Name" onChange={updateValue("name")} />
                        <div className="subtext">
                            <p>Help people discover your account by using the name you're known by: either your full name, nickname, or business name</p>
                        </div>
                    </section>

                    <section>
                        <label>Username</label>
                        <input className="grey-input" type="text" value={info.username} placeholder="Username" onChange={updateValue("username")} />
                    </section>

                    <section>
                        <label>Bio</label>
                        <input className="grey-input" type="text" value={info.bio} placeholder="Bio" onChange={updateValue("bio")} />
                    </section>

                    <section>
                        <label>Email</label>
                        <input className="grey-input" type="text" value={info.email} placeholder="Email" onChange={updateValue("email")} />
                    </section>

                    <button disabled={!isGuestAccount && hasChanged ? false : true} className="blue-button" onClick={(e) => handleSubmit(e)}>Submit</button>
                    {isGuestAccount && <p className="subtext">The guest account may not be edited.</p>}
                </form>
            </main>

            <BottomNav />
        </div>
    );
}



