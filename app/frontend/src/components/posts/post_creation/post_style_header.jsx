import React from 'react';
import icons from '../../shared/icons/svg-icons';
import { updateUser } from '../../../redux/actions/user_actions';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import stateSelectors from '../../../util/state_selectors';



export default function PostStyleHeader({ imageFor }) {
    const currentUserId = useSelector(stateSelectors.currentUserId());
    const history = useHistory();

    const updateProfilePicture = () => {
        // convert editedImage canvas to file object, append to formdata, dispatch to backend
        // redirect to /accounts/edit
        // const formData = new FormData();
        // formData.append('user[photo]', photoFile);
        // dispatch(updateUser(currentUserId, formData))
        //     .then(() => history.push('/accounts/edit'));
    };

    return (
        <header>
            <Link to="/">
                {icons.cross}
            </Link>
            <h3>New Photo Post</h3>
            {imageFor === 'profile' ?
                <button onClick={() => updateProfilePicture()}>Save</button> :
                <Link to="/create/details">Next</Link>}
        </header>
    );
}