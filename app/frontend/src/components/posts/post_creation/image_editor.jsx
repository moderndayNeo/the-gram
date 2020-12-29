import React, { useEffect, useRef } from 'react';
import { updateFilter, updateUploadPageType, setEditedImage, rotateUploadedImage, fitToSquare } from '../../../redux/actions/upload_actions';
import { useSelector } from 'react-redux';
import stateSelectors from '../../../util/state_selectors';
import * as Transformations from '../../../util/transformations';
import { presetsMapping, applyPresetOnCanvas } from 'instagram-filters';

export default function ImageEditor(props) {
    const pageTypeSelected = useSelector(stateSelectors.uploadPageType());
    const { rotation: selectedRotation, filter: selectedFilter, fitWidth: selectedFitWidth } = useSelector(stateSelectors.imageAdjustments());
    const fitWidth = props.forceSquareImage ? true : selectedFitWidth;
    const myCanvas = useRef();

    useEffect(() => {
        if (props.originalImage) saveChanges();
    });

    const saveChanges = () => {
        let tempImage = props.originalImage;
        tempImage = Transformations.rotateImg(tempImage, selectedRotation);
        tempImage = fitWidth ? Transformations.cropFitToSquareImg(tempImage) : tempImage;
        tempImage = Transformations.cropImageBetweenRatios(tempImage, (4 / 5), (16 / 9));
        tempImage = Transformations.scaleImg(tempImage, '1080');
        if (selectedFilter && selectedFilter !== 'Normal') applyPresetOnCanvas(tempImage, presetsMapping[selectedFilter]());
        const displayImage = Transformations.centerImg(tempImage, 400);

        myCanvas.current.width = 400;
        myCanvas.current.height = 400;
        myCanvas.current.getContext("2d").drawImage(displayImage, 0, 0);

        dispatch(setEditedImage(tempImage));
    };

    const rotateImg = () => dispatch(rotateUploadedImage());
    const toggleFitToSquare = () => dispatch(fitToSquare(!fitWidth));

    return (
        <div className="image-editor" >

            <div className="canvas-container">
                <canvas ref={myCanvas} />

                {pageTypeSelected === 'edit' && <RotateIcon rotateImg={rotateImg} />}
                {pageTypeSelected === 'edit' && <EditIcon toggleFitToSquare={toggleFitToSquare} />}
            </div>

            {pageTypeSelected === 'filter' && <Filters selectedFilter={selectedFilter} />}

            <PostStyleFooter pageTypeSelected={pageTypeSelected} />
        </div>
    );
}

const RotateIcon = ({ rotateImg }) => (
    <div
        className="sprite-container rotate"
        onClick={rotateImg}
    >
        <img className="rotate-icon" src={window.postStyleSprites} alt="" />
    </div>
);

const EditIcon = ({ toggleFitToSquare }) => (
    <div
        className="sprite-container edit"
        onClick={toggleFitToSquare}
    >
        <img className="fit-to-square-icon" src={window.postStyleSprites} alt="" />
    </div>
);

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


const Filters = ({ selectedFilter }) => {
    const filterNames = ['Normal', 'Clarendon', 'Gingham', 'Moon', 'Lark', 'Reyes', 'Juno', 'Slumber', 'Crema', 'Ludwig', 'Aden', 'Perpetua'];
    // const selectedFilter = useSelector(stateSelectors.selectedFilter());

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


