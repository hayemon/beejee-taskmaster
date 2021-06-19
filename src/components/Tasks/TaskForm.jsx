import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, reset } from 'redux-form'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    TextField
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import validateRequired from '../../utils/validateRequired'

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    }
}))

const validate = values => {
    const errors = validateRequired({
        values,
        requiredFields: ['username', 'email', 'text']
    })
    if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        // eslint-disable-next-line immutable/no-mutation
        errors.email = 'Invalid email address'
    }
    return errors
}

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

const TaskForm = ({
    open,
    handleClose,
    handleSubmit,
    pristine,
    submitting,
    initialValues,
    reset
}) => {
    const classes = useStyles()
    const usernameFieldDisabled = initialValues && !!initialValues.username

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='form-dialog-title'
        >
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <DialogTitle id='form-dialog-title'>New task</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Field
                                component={renderTextField}
                                id='username'
                                label='Username'
                                name='username'
                                autoComplete='off'
                                disabled={usernameFieldDisabled}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Field
                                component={renderTextField}
                                id='email'
                                label='Email'
                                name='email'
                                type='email'
                                autoComplete='off'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                component={renderTextField}
                                multiline
                                rows={5}
                                id='text'
                                label='Text'
                                name='text'
                                type='text'
                                autoComplete='off'
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='contained'
                        color='secondary'
                        onClick={() => {
                            handleClose()
                            reset()
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        disabled={pristine || submitting}
                    >
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

// eslint-disable-next-line immutable/no-mutation
TaskForm.propTypes = {
    open: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    initialValues: PropTypes.shape({
        username: PropTypes.string
    })
}

// eslint-disable-next-line immutable/no-mutation
TaskForm.defaultProps = {
    initialValues: {
        username: null
    }
}

const afterSubmit = (result, dispatch) => dispatch(reset('TaskForm'))

export default reduxForm({
    form: 'TaskForm',
    validate,
    onSubmitSuccess: afterSubmit
})(TaskForm)
