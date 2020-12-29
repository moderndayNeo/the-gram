import React, { useEffect, useRef } from 'react';
import { updateFilter, updateUploadPageType } from '../../../redux/actions/upload_actions';
import { useSelector } from 'react-redux';
import stateSelectors from '../../../util/state_selectors';
import * as Transformations from '../../../util/transformations';


export default function ImageEditor({ originalImage }) {
    const pageTypeSelected = useSelector(stateSelectors.uploadPageType());
    const myCanvas = useRef();
    const placeholderImg = new Image();
    placeholderImg.src = window.placeholderImgUrl;
    console.log(placeholderImg);

    useEffect(() => {
        if (originalImage) saveChanges();
    });

    const saveChanges = () => {
        let tempImage = originalImage;
        tempImage = Transformations.scaleImg(tempImage, '1080');

        const displayImage = Transformations.centerImg(tempImage, 400);

        myCanvas.current.width = 400;
        myCanvas.current.height = 400;
        myCanvas.current.getContext("2d").drawImage(displayImage, 0, 0);
    };

    const saveChanges = () => {
        let tempImage = originalImage
        // tempImage = Transformations.rotateImg(tempImage, selectedRotation)
        // tempImage = fitWidth ? Transformations.cropFitToSquareImg(tempImage) : tempImage
        tempImage = Transformations.cropImageBetweenRatios(tempImage, (4 / 5), (16 / 9))
        tempImage = Transformations.scaleImg(tempImage, '1080')
        if (selectedFilter && selectedFilter !== 'Normal') applyPresetOnCanvas(tempImage, presetsMapping[selectedFilter]())

        myCanvas.current.width = 400
        myCanvas.current.height = 400
        myCanvas.current.getContext("2d").drawImage(displayImage, 0, 0);

        // dispatch(imageEditorActions.imageSavedSuccess(tempImage)) // save processed img to state
        dispatch(saveProcessedImage(tempImage))
    }

    return (
        <div className="image-editor" >

            <div className="canvas-container">
                <canvas ref={myCanvas} />

                {pageTypeSelected === 'edit' &&
                    <div className="sprite-container">
                        <img className="rotate-icon" src={window.postStyleSprites} alt="" />
                    </div>}

                {pageTypeSelected === 'edit' &&
                    <div className="sprite-container">
                        <img className="fit-to-square-icon" src={window.postStyleSprites} alt="" />
                    </div>
                }
            </div>

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


