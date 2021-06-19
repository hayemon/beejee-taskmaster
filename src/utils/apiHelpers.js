const baseUrl = 'https://uxcandy.com/~shapoval/test-task-backend/v2'

export const getUrl = path => `${baseUrl}${path}?developer=alikhan`

export const generateBody = obj => {
    const body = new FormData()
    Object.keys(obj).forEach(key => {
        body.append(key, obj[key])
    })
    return body
}

export const getErrorMessage = ({ res, err }) => {
    if (err) {
        if (err.response && err.response.data) {
            const { errors } = err.response.data
            if (errors) {
                return errors.map(error => ({
                    msg: error.msg,
                    status: 'error'
                }))
            }
        } else {
            return [{ msg: 'Network error', status: 'error' }]
        }
    } else if (res.data && res.data.message) {
        const { errors } = err.response.data
        return Object.keys(errors).map(key => ({
            msg: `${key}: ${errors[key]}`,
            status: 'error'
        }))
    }
    return { msg: 'Unknown error', status: 'error' }
}
