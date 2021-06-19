import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import alert from './alert'
import auth from './auth'
import task from './task'
import location from './location'

export default combineReducers({
    alert,
    auth,
    task,
    location,
    form: formReducer
})
