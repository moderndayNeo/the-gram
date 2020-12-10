export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS'

const receiveErrors = (errors) => ({
    type: RECEIVE_SESSION_ERRORS,
    errors,
})
