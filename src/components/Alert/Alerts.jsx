import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Alerts = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
        <Alert key={alert.id} severity={alert.type}>
            {alert.message}
        </Alert>
    ))

// eslint-disable-next-line immutable/no-mutation
Alerts.propTypes = {
    alerts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            severity: PropTypes.string,
            message: PropTypes.string
        })
    )
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alerts)
