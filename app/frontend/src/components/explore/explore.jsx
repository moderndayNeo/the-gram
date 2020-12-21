import React, { useState, useEffect } from 'react';
import BottomNav from '../shared/bottom_nav';
import icons from '../shared/icons/svg-icons';
import stateSelectors from '../../util/state_selectors';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import UserAvatar from '../shared/user_avatar';
import { fetchUsersNotFollowed } from '../../redux/actions/session_actions';
import LoadingPlaceholder from '../shared/loading_placeholder';

export default function Explore() {
    const [selected, setSelected] = useState(false);
    const [filter, setFilter] = useState('');
    const users = useSelector(stateSelectors.allUsers());
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // setLoading(true)
        // .then(() => setLoading(false))
        //  dispatch(fetchUsersNotFollowed())
    }), [];

    
    return (
        <div className="explore">
            <SearchBar
                selected={selected}
                setSelected={setSelected}
                filter={filter}
                setFilter={setFilter}
            />
            {
                users.length > 0 ?
                    <LoadingPlaceholder /> :
                    <PagesToExplore users={users} />
            }
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

const PagesToExplore = ({ users }) => {

    return (
        <div className="pages-to-explore">
            {
                users.map(user => (
                    <li key={user.id} className="page-link">
                        <Link to={`/users/${user.id}`}>
                            <div className="container">
                                <UserAvatar imageUrl={user.image_url} />
                                <div className="username-and-bio">
                                    <p className="username-link">{user.username}</p>
                                    {user.bio.length > 40 ?
                                        <p className="explore-bio">{user.bio.slice(0, 40)}...</p> :
                                        <p className="explore-bio">{user.bio}</p>}
                                </div>
                            </div>
                        </Link>
                    </li>
                ))
            }
        </div>
    );
};