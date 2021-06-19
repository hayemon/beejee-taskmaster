import { SET_LOCATION } from '../actions/types'

const initialState = {
    hash: '',
    pathname: '/',
    search: ''
}

export default (state = initialState, action) => {
    const { type, data } = action

    switch (type) {
        case SET_LOCATION:
            return data
        default:
            return state
    }
}
