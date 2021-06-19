import axios from 'axios'
import setAlert from './alert'
import { ADD_TASK, GET_TASKS, SET_TASK, UPDATE_TASK, ERROR_TASK } from './types'
import { getUrl, generateBody, getErrorMessage } from '../utils/apiHelpers'

export const setTask = task => async dispatch => {
    dispatch({
        type: SET_TASK,
        data: { task }
    })
}

export const errorTask = errors => async dispatch => {
    if (errors && errors.length) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'error')))

        dispatch({
            type: ERROR_TASK,
            data: errors
        })
    }
}

// POST
export const createTask = formData => async dispatch => {
    const url = getUrl('/create')
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    const body = generateBody(formData)

    let errors = []
    try {
        const res = await axios.post(url, body, config)
        const ok = res.data && res.data.status === 'ok'

        if (ok) {
            dispatch({
                type: ADD_TASK,
                data: res.data.message
            })

            dispatch(setAlert('Task Created', 'success'))
        } else {
            errors = getErrorMessage({ res })
        }
    } catch (err) {
        errors = getErrorMessage({ err })
    }
    dispatch(errorTask(errors))
}

// GET LIST
export const getTasks =
    ({ sortField, sortDirection, page }) =>
    async dispatch => {
        let url = getUrl('/')
        if (sortField) {
            url += `&sort_field=${sortField}`
            url += `&sort_direction=${sortDirection || 'desc'}`
        }
        if (page) {
            url += `&page=${page}`
        }

        let errors = []
        try {
            const res = await axios.get(url, {
                headers: {}
            })
            const ok = res.data && res.data.status === 'ok'
            if (ok) {
                dispatch({
                    type: GET_TASKS,
                    data: {
                        ...res.data.message,
                        query: {
                            sortField,
                            sortDirection,
                            page
                        }
                    }
                })
            } else {
                errors = getErrorMessage({ res })
            }
        } catch (err) {
            errors = getErrorMessage({ err })
        }
        dispatch(errorTask(errors))
    }

// PUT
export const editTask = formData => async dispatch => {
    const url = getUrl(`/edit/${formData.id}`)
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    const body = generateBody(formData)

    let errors = []
    try {
        const res = await axios.post(url, body, config)
        const ok = res.data && res.data.status === 'ok'

        if (ok) {
            dispatch({
                type: UPDATE_TASK,
                data: res.data.message || formData
            })

            dispatch(setAlert('Task Updated', 'success'))
        } else {
            errors = getErrorMessage({ res })
        }
    } catch (err) {
        errors = getErrorMessage({ err })
    }
    dispatch(errorTask(errors))
}
