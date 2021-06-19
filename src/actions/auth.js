import axios from 'axios'

import setAlert from './alert'
import { SIGNIN_SUCCESS, SIGNIN_FAIL, SIGNOUT, AUTH_UPDATE } from './types'
import { getUrl, generateBody } from '../utils/apiHelpers'

export const authUpdate = () => dispatch => {
    dispatch({ type: AUTH_UPDATE })
}

export const signout = () => dispatch => {
    dispatch({ type: SIGNOUT })
}

export const signin =
    ({ username, password }) =>
    async dispatch => {
        const url = getUrl('/login')
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const body = generateBody({ username, password })
        try {
            const res = await axios.post(url, body, config)
            const ok = res.data && res.data.status === 'ok'

            if (ok) {
                dispatch({
                    type: SIGNIN_SUCCESS,
                    data: { ...res.data.message, username }
                })
            } else {
                dispatch(setAlert(res.data.message, 'error'))
                dispatch({
                    type: SIGNIN_FAIL
                })
            }
        } catch (err) {
            const { errors } = err.response.data
            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'error')))
            }
            dispatch({
                type: SIGNIN_FAIL
            })
        }
    }
