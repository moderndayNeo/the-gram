import React from 'react';
import BottomNav from '../shared/bottom_nav';
import DevelopmentModal from '../shared/development_modal';
import icons from '../shared/icons/svg-icons';
{/* <DevelopmentModal feature={'Explore Page'} /> */ }

export default function Explore() {
    return (
        <div className="explore">
            <SearchBar />
            <BottomNav />
        </div>
    );
}

const SearchBar = () => {
    return (
        <header>
            <div
                className="search-bar search-bar-placeholder"
            >

                {icons.filledCompass}
Search

           </div>
        </header>

    );
};