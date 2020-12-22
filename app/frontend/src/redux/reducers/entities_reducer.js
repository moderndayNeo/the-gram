import { combineReducers } from 'redux'
import usersReducer from './users_reducer'
import postsReducer from './posts_reducer'
import commentsReducer from './comments_reducer'
import notificationsReducer from './notifications_reducer'

export default combineReducers({
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
    notifications: notificationsReducer,
})
