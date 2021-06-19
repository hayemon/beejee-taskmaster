import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import setAlert from '../../actions/alert'
import { signin } from '../../actions/auth'
import AuthView from './AuthForm'

const Auth = ({ signin, username }) => {
    const initialValues = {
        username,
        password: ''
    }

    const onSubmit = formValues => {
        signin(formValues)
    }

    if (username) {
        return <Redirect to='/' />
    }

    return <AuthView onSubmit={onSubmit} initialValues={initialValues} />
}

// eslint-disable-next-line immutable/no-mutation
Auth.propTypes = {
    signin: PropTypes.func.isRequired,
    username: PropTypes.string
}

// eslint-disable-next-line immutable/no-mutation
Auth.defaultProps = {
    username: null
}

const mapStateToProps = state => ({
    username: state.auth.username
})

export default connect(mapStateToProps, { setAlert, signin })(Auth)
