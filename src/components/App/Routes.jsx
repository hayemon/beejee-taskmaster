import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import Auth from '../Auth'
import Tasks from '../Tasks'
import NavBar from '../NavBar'
import Alerts from '../Alert'
import Footer from '../Footer'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2)
    }
}))

const Routes = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <NavBar />
            <Alerts />
            <div className={classes.main}>
                <Switch>
                    <Route exact path='/signin' component={() => <Auth />} />
                    <Route exact path='' component={() => <Tasks />} />
                </Switch>
            </div>

            <Footer />
        </div>
    )
}

export default Routes
