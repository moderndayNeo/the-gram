export const RECEIVE_ERRORS = 'RECEIVE_ERRORS'

const receiveErrors = errors => ({
    type: RECEIVE_ERRORS,
    errors
})

// export const receiveNewErrors