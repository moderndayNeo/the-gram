import React, { useEffect, useRef } from 'react';
import { updateFilter, updateUploadPageType, setEditedImage, rotateUploadedImage, fitToSquare } from '../../../redux/actions/upload_actions';
import { useSelector, useDispatch } from 'react-redux';
import stateSelectors from '../../../util/state_selectors';
import * as Transformations from '../../../util/transformations';
import { presetsMapping, applyPresetOnCanvas } from 'instagram-filters';

export default function ImageEditor(props) {
    const dispatch = useDispatch();
    const pageTypeSelected = useSelector(stateSelectors.uploadPageType());
    const { rotation: selectedRotation, filter: selectedFilter, fitWidth: selectedFitWidth } = useSelector(stateSelectors.imageAdjustments());
    const fitWidth = props.forceSquareImage ? true : selectedFitWidth;
    const myCanvas = useRef();

    useEffect(() => {
        if (props.originalImage) saveChanges();
    });

    const saveChanges = () => {
        let tempImage = props.originalImage; // img object
        tempImage = Transformations.rotateImg(tempImage, selectedRotation);
        tempImage = fitWidth ? Transformations.cropFitToSquareImg(tempImage) : tempImage;
        tempImage = Transformations.cropImageBetweenRatios(tempImage, (4 / 5), (16 / 9));
        tempImage = Transformations.scaleImg(tempImage, '1080');
        if (selectedFilter && selectedFilter !== 'Normal') applyPresetOnCanvas(tempImage, presetsMapping[selectedFilter]());
        const displayImage = Transformations.centerImg(tempImage, 400);

        myCanvas.current.width = 400;
        myCanvas.current.height = 400;
        myCanvas.current.getContext("2d").drawImage(displayImage, 0, 0);

        dispatch(setEditedImage(tempImage)); // canvas object with edits applied
    };

    const rotateImg = () => dispatch(rotateUploadedImage());
    const toggleFitToSquare = () => dispatch(fitToSquare(!fitWidth));

    return (
        <div className="image-editor" >

            <div className="canvas-container">
                <canvas id="myCanvas" ref={myCanvas} />

                {pageTypeSelected === 'edit' && <RotateButton rotateImg={rotateImg} />}
                {pageTypeSelected === 'edit' && <EditButton toggleFitToSquare={toggleFitToSquare} />}
            </div>

            {pageTypeSelected === 'filter' && <Filters selectedFilter={selectedFilter} />}

            <PostStyleFooter pageTypeSelected={pageTypeSelected} />
        </div>
    );
}

const RotateButton = ({ rotateImg }) => (
    <button
        className="rotate-button"
        onClick={rotateImg}
    >
        <span
            className="rotate-sprite"
            style={{ "backgroundImage": `url(${window.postStyleSprites})` }}
        >
            Rotate
        </span>
    </button>
);

const EditButton = ({ toggleFitToSquare }) => (
    <button
        className="edit-button"
        onClick={toggleFitToSquare}
    >
        <span
            className="edit-sprite"
            style={{ "backgroundImage": `url(${window.postStyleSprites})` }}
        >
            Edit
        </span>
    </button>
);


const PostStyleFooter = ({ pageTypeSelected }) => {
    const dispatch = useDispatch();

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
    const dispatch = useDispatch();

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
