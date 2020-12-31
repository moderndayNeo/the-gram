import React from 'react';
import icons from '../shared/icons/svg-icons';
import { useHistory } from 'react-router-dom';
import BottomNav from '../shared/bottom_nav';
import SuggestedUsersList from '../shared/suggested_users_list';

export default function Suggested() {
    const history = useHistory();

    return (
        <div className="suggested user-list-page scroll-page">
            <header className="fixed-header">
                <div onClick={() => history.goBack()}>
                    {icons.chevron}
                </div>
                <h3>Discover People</h3>
                <div></div>
            </header>

            <h4 className="suggested-title">Suggested</h4>
            <SuggestedUsersList />
            <BottomNav />
        </div>
    );
}