import React, { useState } from 'react';
import BottomNav from '../shared/bottom_nav';
import icons from '../shared/icons/svg-icons';

export default function Explore() {
    const [selected, setSelected] = useState(false);
    const [filter, setFilter] = useState('');
    return (
        <div className="explore">
            <SearchBar
                selected={selected}
                setSelected={setSelected}
                filter={filter}
                setFilter={setFilter}
            />
            <BottomNav />
        </div>
    );
}

const SearchBar = ({ selected, setSelected, filter, setFilter }) => {
    const handleCancel = () => {
        setSelected(false);
        setFilter('');
    };
    
    console.log(filter);
    return (
        <header>
            {
                selected ?
                    <div className="search-bar search-bar-selected">
                        {icons.filledCompass}
                        <input
                            placeholder="Search"
                            autoFocus
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />

                    </div> :
                    <div
                        className="search-bar search-bar-placeholder"
                        onClick={() => setSelected(true)}
                    >{icons.filledCompass} Search</div>
            }
            {
                selected &&
                <button className="cancel-button" onClick={() => handleCancel()}>Cancel</button>
            }
        </header>

    );
};