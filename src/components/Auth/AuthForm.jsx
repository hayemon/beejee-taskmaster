import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import {
    Avatar,
    Button,
    Container,
    CssBaseline,
    TextField,
    Typography
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import validateRequired from '../../utils/validateRequired'

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}))
const validate = values =>
    validateRequired({ values, requiredFields: ['username', 'password'] })

const renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
}) => (
    <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
)

const AuthForm = ({ handleSubmit, pristine, submitting }) => {
    const classes = useStyles()

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component='h1' variant='h5'>
                    Login
                </Typography>

                <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <Field
                        component={renderTextField}
                        id='username'
                        label='Username'
                        name='username'
                        autoComplete='off'
                        autoFocus
                    />
                    <Field
                        component={renderTextField}
                        id='password'
                        label='Password'
                        name='password'
                        type='password'
                        autoComplete='off'
                    />

                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                        disabled={pristine || submitting}
                    >
                        Login
                    </Button>
                </form>
            </div>
        </Container>
    )
}

// eslint-disable-next-line immutable/no-mutation
AuthForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired
}

export default reduxForm({
    form: 'AuthForm',
    validate
})(AuthForm)
