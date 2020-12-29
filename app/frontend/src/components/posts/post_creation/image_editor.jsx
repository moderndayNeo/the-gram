import React from 'react';
import { updateFilter, updateUploadPageType } from '../../../redux/actions/upload_actions';
import { useSelector } from 'react-redux';
import stateSelectors from '../../../util/state_selectors';


export default function ImageEditor({ originalImage }) {
    const pageTypeSelected = useSelector(stateSelectors.uploadPageType());

    return (
        <div className="image-editor">

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


