import React from 'react'
import PropTypes from 'prop-types'
import {
    Avatar,
    ButtonGroup,
    Button,
    Container,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    Typography,
    Tooltip
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
    Done,
    CheckCircle,
    Add,
    Edit,
    ExpandLess,
    ExpandMore
} from '@material-ui/icons'
import Pagination from '@material-ui/lab/Pagination'

const useStyles = makeStyles(theme => ({
    green: {
        color: theme.palette.success.main
    },
    grey: {
        color: theme.palette.action.disabled
    },
    yellow: {
        color: theme.palette.warning.main
    },
    buttonGroup: {
        marginBottom: theme.spacing(4)
    },
    pagination: {
        marginTop: theme.spacing(8)
    }
}))

const getUsernameFirstLetter = username =>
    username && username.length > 0 ? username[0] : ''

const sortFieldsButtonGroup = ({
    filterOptions,
    onChangeSortField,
    sortField
}) =>
    filterOptions.map(filter => (
        <Button
            key={filter}
            variant={sortField === filter ? 'contained' : 'outlined'}
            onClick={() => onChangeSortField(filter)}
        >
            {filter}
        </Button>
    ))

const sortDirectionButton = ({ sortDirection, onChangeSortDirection }) => (
    <Tooltip
        title={`Current sorting is ${
            sortDirection === 'desc' ? 'ASCENDING' : 'DESCENDING'
        }`}
    >
        <Button onClick={onChangeSortDirection}>
            {sortDirection === 'desc' ? <ExpandLess /> : <ExpandMore />}
        </Button>
    </Tooltip>
)

const createButton = onEdit => (
    <Button
        variant='contained'
        color='secondary'
        aria-label='add'
        onClick={() => onEdit({})}
    >
        <Add />
    </Button>
)

const statusIcon = ({ status, classes }) => {
    const notCompleted = () => (
        <Tooltip title='Not completed'>
            <CheckCircle variant='contained' className={classes.grey} />
        </Tooltip>
    )
    const completed = () => (
        <Tooltip title='Completed'>
            <CheckCircle variant='contained' className={classes.green} />
        </Tooltip>
    )
    const modified = () => (
        <Tooltip title='Modified by administrator'>
            <Edit variant='contained' className={classes.yellow} />
        </Tooltip>
    )

    switch (status) {
        case 0:
            return notCompleted()

        case 1:
            return (
                <div>
                    {notCompleted()}
                    {modified()}
                </div>
            )
        case 10:
            return completed()

        case 11:
            return (
                <div>
                    {completed()}
                    {modified()}
                </div>
            )
        default:
            return <div />
    }
}

const TasksView = ({
    tasks,
    tasksTotalCount,

    filterOptions,
    sortField,
    sortDirection,

    onMoveToPage,
    onChangeSortField,
    onChangeSortDirection,
    onEdit,
    onComplete,
    token
}) => {
    const classes = useStyles()
    const totalPagesCount = Math.ceil(tasksTotalCount / 3)

    return (
        <Container maxWidth='md' className='root'>
            <Grid container justify='center'>
                <ButtonGroup
                    color='primary'
                    aria-label='outlined primary button group'
                    className={classes.buttonGroup}
                >
                    {sortFieldsButtonGroup({
                        filterOptions,
                        onChangeSortField,
                        sortField
                    })}
                    {sortDirectionButton({
                        sortDirection,
                        onChangeSortDirection
                    })}
                    {createButton(onEdit)}
                </ButtonGroup>
            </Grid>
            <Grid container spacing={5}>
                {tasks.map(taskItem => {
                    if (!taskItem) return <div />
                    const { id, username, email, text, status } = taskItem
                    return (
                        <Grid item xs={4} key={id}>
                            <Card className={classes.root}>
                                <CardHeader
                                    avatar={
                                        <Avatar className={classes.avatar}>
                                            {getUsernameFirstLetter(username)}
                                        </Avatar>
                                    }
                                    action={statusIcon({ status, classes })}
                                    title={username}
                                    subheader={email}
                                />
                                <CardContent>
                                    <Typography
                                        variant='body2'
                                        color='textSecondary'
                                        component='p'
                                    >
                                        {text}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    {!!token && (
                                        <IconButton
                                            onClick={() => onEdit(taskItem)}
                                        >
                                            <Edit />
                                        </IconButton>
                                    )}
                                    <IconButton
                                        onClick={() => onComplete(taskItem)}
                                    >
                                        <Done />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
            <Grid container justify='center'>
                <Pagination
                    count={totalPagesCount}
                    color='secondary'
                    className={classes.pagination}
                    onChange={onMoveToPage}
                />
            </Grid>
        </Container>
    )
}

// eslint-disable-next-line immutable/no-mutation
TasksView.propTypes = {
    filterOptions: PropTypes.arrayOf(PropTypes.string).isRequired,

    onChangeSortDirection: PropTypes.func.isRequired,
    onChangeSortField: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onMoveToPage: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired,

    sortDirection: PropTypes.string.isRequired,
    sortField: PropTypes.string.isRequired,

    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            username: PropTypes.string,
            email: PropTypes.string,
            text: PropTypes.string,
            status: PropTypes.number
        })
    ).isRequired,
    tasksTotalCount: PropTypes.number.isRequired,
    token: PropTypes.string
}

// eslint-disable-next-line immutable/no-mutation
TasksView.defaultProps = {
    token: null
}

export default TasksView
