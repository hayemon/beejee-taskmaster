import {
    ADD_TASK,
    GET_TASKS,
    SET_TASK,
    UPDATE_TASK,
    ERROR_TASK
} from '../actions/types'

const initialState = {
    query: {
        sortField: 'id',
        sortDirection: 'desc',
        page: 1
    },
    task: null,
    tasks: [],
    tasksTotalCount: 0,
    loading: true,
    error: {}
}

export default (state = initialState, action) => {
    const { type, data } = action

    switch (type) {
        case ADD_TASK:
            return {
                ...state,
                tasks: [data, state.tasks[0], state.tasks[1]],
                tasksTotalCount: parseInt(state.tasksTotalCount + 1, 10),
                loading: false
            }
        case GET_TASKS:
            return {
                ...state,
                tasks: data.tasks,
                tasksTotalCount: parseInt(data.total_task_count, 10),
                loading: false,
                query: {
                    ...state.query,
                    ...data.query
                }
            }
        case SET_TASK:
            return { ...state, task: data.task || null }
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(x => (x.id === data.id ? data : x)),
                loading: false
            }
        case ERROR_TASK:
            return {
                ...state,
                error: data,
                loading: false
            }
        default:
            return state
    }
}
