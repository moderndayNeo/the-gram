import React from 'react'
import BottomNav from '../shared/bottom_nav';
import DevelopmentModal from '../shared/development_modal';

export default function Explore() {
    return (
        <div>
            <DevelopmentModal feature={'Explore Page'} />
            <BottomNav />
        </div>
    )
}
