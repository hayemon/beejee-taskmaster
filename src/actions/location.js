import { SET_LOCATION } from './types'

const setLocation = data => dispatch => {
    dispatch({ type: SET_LOCATION, data })
}

export default setLocation
