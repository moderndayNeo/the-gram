import React from 'react';
import BottomNav from '../shared/bottom_nav';
import DevelopmentModal from '../shared/development_modal';

export default function Activity() {
    return (
        <div>
            <DevelopmentModal feature='Activity Page' />
            <BottomNav />
        </div>
    );
}
