import {combineReducers} from 'redux'
import globalReducer from './Global/reducer'
import chatsReducer from './Messages/list/reducer'
import deleteMessagesReducer from './Messages/delete/reducer'
import profilesReducer from './Profiles/list/reducer'
import profileDetailReducer from './Profiles/detail/reducer'
import createProfileReducer from './Profiles/create/reducer'
import userLoginReducer from './Users/login/reducer'
import userRegistrationReducer from './Users/register/reducer'
import updateProfileReducer from './Profiles/update/reducer'

const rootReducer = combineReducers({
    global: globalReducer,
    messages: chatsReducer,
    deleteMessages: deleteMessagesReducer,
    profiles: profilesReducer,
    profileDetail: profileDetailReducer,
    createProfile: createProfileReducer,
    profileUpdate: updateProfileReducer,
    userLogin: userLoginReducer,
    userRegistration: userRegistrationReducer
})

export default rootReducer