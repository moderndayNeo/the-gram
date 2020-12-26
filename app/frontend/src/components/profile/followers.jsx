import React from 'react';
import icons from '../shared/icons/svg-icons';
import { useHistory } from 'react-router-dom';
import DynamicFollowButton from '../shared/dynamic_follow_button';

export default function Followers() {
    const history = useHistory();

    return (
        <div className="followers">
            <header>
                <div onClick={() => history.goBack()}>
                    {icons.chevron}
                </div>
                <h3>Followers</h3>
                <div></div>
            </header>

            {/* <Follower /> */}
        </div>
    );
}


// const Follower = ({ user }) => {
//     return (
//         <li className="follower">
//             <div className="container">
//                 <div className="image-and-text">
//                     <UserAvatar imageUrl={user.image_url} />
//                     <div className="text">
//                         <p>emanuele calvello</p>
//                         <p>Emanuele ;)</p>
//                     </div>
//                 </div>
//                 <DynamicFollowButton userId={user.id} />
//             </div>
//         </li>
//     );
// };