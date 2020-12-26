import * as APIUtil from '../../util/api_util'

import { receiveUsers } from './session_actions'

export const fetchFollowers = () => (dispatch) =>
    APIUtil.fetchFollowers()
        .then(({ data: { users } }) => dispatch(receiveUsers(users)))
        .catch((errors) => console.log(errors))

export const fetchSuggestedUsers = () => (dispatch) =>
    APIUtil.fetchUsersNotFollowed()
        .then(({ data: { users } }) => {
            dispatch(receiveUsers(users))
        })
        .catch((errors) => console.log(errors))
