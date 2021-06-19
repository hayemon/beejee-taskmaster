import {
    SIGNIN_SUCCESS,
    SIGNIN_FAIL,
    SIGNOUT,
    AUTH_UPDATE
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username'),
    loading: false
}

export default (state = initialState, action) => {
    const { type, data } = action

    switch (type) {
        case SIGNIN_SUCCESS:
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.username)
            return {
                ...state,
                ...data,
                loading: false
            }
        case SIGNIN_FAIL:
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            return {
                ...state,
                token: null,
                loading: false,
                username: null
            }
        case SIGNOUT:
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            return {
                ...state,
                token: null,
                loading: false,
                username: null
            }
        case AUTH_UPDATE:
            return {
                ...state,
                token: localStorage.getItem('token'),
                username: localStorage.getItem('username')
            }

        default:
            return state
    }
}
