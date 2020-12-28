import React, { useState } from 'react';
import { useLocation, Link, useHistory } from 'react-router-dom';
import icons from '../../shared/icons/svg-icons';
import { useSelector } from 'react-redux';
import { updateUser } from '../../../redux/actions/user_actions';
import stateSelectors from '../../../util/state_selectors';
import { updateFilter } from '../../../redux/actions/upload_actions';

export default function PostStyle() {
    const location = useLocation();
    const photoUrl = location.state ? location.state.photoUrl : window.placeholderImg;
    const photoFile = location.state ? location.state.photoFile : null;
    const photoType = location.state ? location.state.type : 'post';

    return (
        <div className="post-style">
            <PostStyleHeader
                photoFile={photoFile}
                photoUrl={photoUrl}
                photoType={photoType}
            />

            <div className="image-container">
                <img src={photoUrl} alt="post photo" />
            </div>

            {/* <div className="sprite-container">
                <img className="rotate-icon" src={window.postStyleSprites} alt="" />
            </div>

            <div className="sprite-container">
                <img className="fit-to-square-icon" src={window.postStyleSprites} alt="" />
            </div> */}

            <Filters />

            <PostStyleFooter />
        </div>
    );
}

const PostStyleHeader = ({ photoFile, photoUrl, photoType }) => {
    const currentUserId = useSelector(stateSelectors.currentUserId());
    const history = useHistory();

    const updateProfilePicture = () => {
        const formData = new FormData();
        formData.append('user[photo]', photoFile);
        dispatch(updateUser(currentUserId, formData))
            .then(() => history.push('/accounts/edit'));
    };

    return (
        <header>
            <Link to="/">
                {icons.cross}
            </Link>
            <h3>New Photo Post</h3>
            {
                photoType === 'profile' ?
                    <button onClick={() => updateProfilePicture()}>Save</button> :
                    <Link to={{
                        pathname: '/create/details',
                        state: {
                            photoUrl,
                            photoFile
                        }
                    }}>Next</Link>
            }
        </header >
    );
};

const PostStyleFooter = () => {
    const [selected, setSelected] = useState('filter');

    return (
        <footer>
            <button onClick={() => setSelected('filter')} className={selected === 'filter' ? "selected" : null}>Filter</button>
            <button onClick={() => setSelected('edit')} className={selected === 'edit' ? "selected" : null}>Edit</button>
        </footer>
    );
};

const Filters = () => {
    const filterNames = ['Normal', 'Clarendon', 'Gingham', 'Moon', 'Lark', 'Reyes', 'Juno', 'Slumber', 'Crema', 'Ludwig', 'Aden', 'Perpetua'];

    return (
        <div className="filters-container">
            {
                filterNames.map(name => (
                    <FilterButton
                        key={name}
                        name={name}
                        selected={name === 'Normal'}
                    // selected={name === selectedFilter}
                    />
                ))
            }
        </div>
    );

};

const FilterButton = (props) => {
    const selectedFilter = useSelector(stateSelectors.selectedFilter());
    console.log(selectedFilter);

    return (
        <button
            className="filter-button"
            onClick={() => dispatch(updateFilter(props.name))}

        >
            <p className="filter-name">{props.name}</p>
            <img src={window[props.name.toLowerCase() + 'Filter']} alt="" />
        </button>
    );
};