import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getTasks, setTask, createTask, editTask } from '../../actions/task'
import TasksView from './TasksView'
import TaskForm from './TaskForm'

const Tasks = ({
    getTasks,
    setTask,
    createTask,
    editTask,
    username,
    token,
    task: { tasks, tasksTotalCount, query, task }
}) => {
    useEffect(() => {
        getTasks(query)
    }, [getTasks])

    const filterOptions = ['id', 'username', 'email', 'status']

    const { sortField, sortDirection } = query

    const onMoveToPage = (e, page) => {
        getTasks({
            ...query,
            page
        })
    }

    const onChangeSortField = sortField => {
        getTasks({
            ...query,
            sortField
        })
    }

    const onChangeSortDirection = () => {
        const sortDirection =
            !query.sortDirection || query.sortDirection === 'desc'
                ? 'asc'
                : 'desc'

        getTasks({
            ...query,
            sortDirection
        })
    }

    const onEdit = taskInitialValues => {
        setTask(taskInitialValues)
    }

    const handleClose = () => {
        setTask()
    }

    const onComplete = async task => {
        let status = 0
        switch (task.status) {
            case 0:
                status = 10
                break
            case 1:
                status = 11
                break
            default:
                break
        }
        await editTask({ ...task, token, status })
        handleClose()
        await getTasks(query)
    }

    const onSubmit = async task => {
        if (task && task.id) {
            let status = 0
            switch (task.status) {
                case 0:
                    status = 1
                    break
                case 10:
                    status = 11
                    break
                default:
                    break
            }
            await editTask({ ...task, token, status })
        } else {
            await createTask(task)
        }
        handleClose()
        await getTasks(query)
    }

    const isOpen = !!task

    const initialValues = {
        ...task,
        username: task && task.username ? task.username : username
    }

    return (
        <div>
            <TaskForm
                open={isOpen}
                handleClose={handleClose}
                onSubmit={onSubmit}
                initialValues={initialValues}
                enableReinitialize
            />
            <TasksView
                tasks={tasks}
                tasksTotalCount={tasksTotalCount}
                filterOptions={filterOptions}
                sortField={sortField}
                sortDirection={sortDirection}
                onMoveToPage={onMoveToPage}
                onChangeSortField={onChangeSortField}
                onChangeSortDirection={onChangeSortDirection}
                onEdit={onEdit}
                onComplete={onComplete}
                token={token}
            />
        </div>
    )
}

const taskShape = PropTypes.shape({
    id: PropTypes.id,
    username: PropTypes.string,
    email: PropTypes.string,
    text: PropTypes.string,
    status: PropTypes.number
})

// eslint-disable-next-line immutable/no-mutation
Tasks.propTypes = {
    getTasks: PropTypes.func.isRequired,
    setTask: PropTypes.func.isRequired,
    createTask: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired,
    username: PropTypes.string,
    token: PropTypes.string,
    task: PropTypes.shape({
        loading: PropTypes.bool,
        task: taskShape,
        tasks: PropTypes.arrayOf(taskShape),
        tasksTotalCount: PropTypes.number,
        query: PropTypes.shape({
            sortField: PropTypes.string,
            sortDirection: PropTypes.string,
            page: PropTypes.number
        })
    }).isRequired
}

// eslint-disable-next-line immutable/no-mutation
Tasks.defaultProps = {
    username: '',
    token: ''
}

const mapStateToProps = state => ({
    task: state.task,
    username: state.auth.username,
    token: state.auth.token
})

export default connect(mapStateToProps, {
    getTasks,
    setTask,
    createTask,
    editTask
})(Tasks)
