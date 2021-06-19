import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Typography
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'
import setLocation from '../../actions/location'
import { signout, authUpdate } from '../../actions/auth'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}))

const NavBar = ({ username, location, setLocation, signout, authUpdate }) => {
    const classes = useStyles()
    const locationNew = useLocation()
    useEffect(() => {
        if (location.pathname !== locationNew.pathname) {
            const { hash, pathname, search } = locationNew
            setLocation({
                hash,
                pathname,
                search
            })
        }
    }, [location])

    useEffect(() => {
        window.addEventListener('storage', () => {
            authUpdate()
        })
    }, [])

    return (
        <div>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton
                        className={classes.menuButton}
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        href='/'
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6' className={classes.title}>
                        BeeJee TaskMaster
                    </Typography>
                    {!username ? (
                        <Button
                            pulledright='true'
                            href='/signin'
                            color='inherit'
                        >
                            Login
                        </Button>
                    ) : (
                        <Button
                            pulledright='true'
                            color='inherit'
                            onClick={signout}
                        >
                            Logout
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}

// eslint-disable-next-line immutable/no-mutation
NavBar.propTypes = {
    username: PropTypes.string,
    location: PropTypes.shape({
        hash: PropTypes.string.isRequired,
        pathname: PropTypes.string.isRequired,
        search: PropTypes.string.isRequired
    }).isRequired,
    setLocation: PropTypes.func.isRequired,
    signout: PropTypes.func.isRequired,
    authUpdate: PropTypes.func.isRequired
}

// eslint-disable-next-line immutable/no-mutation
NavBar.defaultProps = {
    username: null
}

const mapStateToProps = state => ({
    username: state.auth.username,
    location: state.location
})

export default connect(mapStateToProps, { setLocation, signout, authUpdate })(
    NavBar
)
