import React, { useState } from 'react';
import { useLocation, Link, useHistory } from 'react-router-dom';
import icons from '../../shared/icons/svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../../redux/actions/user_actions';
import stateSelectors from '../../../util/state_selectors';
import { updateFilter, updateUploadPageType } from '../../../redux/actions/upload_actions';

export default function PostStyle() {
    const pageTypeSelected = useSelector(stateSelectors.uploadPageType());
    const imageFor = useSelector(stateSelectors.imageFor());
    const originalImage = useSelector(stateSelectors.originalImage());

    return (
        <div className="post-style">
            <PostStyleHeader
                imageFor={imageFor}
            />

            <div className="image-container">
                {/* original image, drawn on canvas */}
                <canvas></canvas>
            </div>

            {pageTypeSelected === 'edit' &&
                <div className="sprite-container">
                    <img className="rotate-icon" src={window.postStyleSprites} alt="" />
                </div>}

            {pageTypeSelected === 'edit' &&
                <div className="sprite-container">
                    <img className="fit-to-square-icon" src={window.postStyleSprites} alt="" />
                </div>
            }


            {pageTypeSelected === 'filter' && <Filters />}

            <PostStyleFooter pageTypeSelected={pageTypeSelected} />
        </div>
    );
}



const PostStyleHeader = ({ imageFor }) => {
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
            {
                imageFor === 'profile' ?
                    <button onClick={() => updateProfilePicture()}>Save</button> :
                    <Link to={{
                        pathname: '/create/details',
                    }}>Next</Link>
            }
        </header >
    );
};

const PostStyleFooter = ({ pageTypeSelected }) => {
    return (
        <footer>
            {
                ['filter', 'edit'].map(pageType => (
                    <button
                        key={pageType}
                        className={pageType === pageTypeSelected ? 'selected' : null}
                        onClick={() => dispatch(updateUploadPageType(pageType))}
                    >
                        {pageType[0].toUpperCase() + pageType.slice(1)}
                    </button>
                ))
            }
        </footer>
    );
};

const Filters = () => {
    const filterNames = ['Normal', 'Clarendon', 'Gingham', 'Moon', 'Lark', 'Reyes', 'Juno', 'Slumber', 'Crema', 'Ludwig', 'Aden', 'Perpetua'];
    const selectedFilter = useSelector(stateSelectors.selectedFilter());

    return (
        <div className="filters-container">
            {
                filterNames.map(name => (
                    <FilterButton
                        key={name}
                        name={name}
                        selected={name === selectedFilter}
                    />
                ))
            }
        </div>
    );

};

const FilterButton = (props) => {

    return (
        <button
            className={`filter-button ${props.selected && "selected-filter"}`}
            onClick={() => dispatch(updateFilter(props.name))}

        >
            <p className="filter-name">{props.name}</p>
            <img src={window[props.name.toLowerCase() + 'Filter']} alt="" />
        </button>
    );
};





// const EditOverlay = () => (
//     <div className="edit-overlay">
//         <div style="left: 33%; top: 0%; width: 1px; height: 100%;"></div>
//         <div style="right: 33%; top: 0%; width: 1px; height: 100%;"></div>
//         <div style="top: 33%; left: 0%; height: 1px; width: 100%;"></div>
//         <div style="bottom: 33%; left: 0%; height: 1px; width: 100%;"></div>
//     </div>
// );