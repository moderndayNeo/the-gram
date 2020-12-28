import { combineReducers } from 'redux'
import entitiesReducer from './entities_reducer'
import sessionReducer from './session_reducer'
import errorsReducer from './errors_reducer'
import uiReducer from './ui_reducer'
import uploadReducer from './upload_reducer'

export default combineReducers({
    entities: entitiesReducer,
    session: sessionReducer,
    errors: errorsReducer,
    ui: uiReducer,
    upload: uploadReducer,
})
