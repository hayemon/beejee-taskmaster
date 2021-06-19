const validateRequired = ({ values, requiredFields = [] }) => {
    const errors = {}
    requiredFields.forEach(field => {
        if (!values[field]) {
            // eslint-disable-next-line immutable/no-mutation
            errors[field] = 'Required'
        }
        if (/[%<>\\$'"]/.test(values[field])) {
            // eslint-disable-next-line immutable/no-mutation
            errors[field] = 'Bad characters: %<>$\'"'
        }
    })
    return errors
}

export default validateRequired
