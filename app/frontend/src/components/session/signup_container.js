import { connect } from 'react-redux'
import { createNewUser } from '../../redux/actions/session'
import { loginUser, logoutUser } from '../../util/session'
import signupForm from './signup_form'
import {
    createNewUser,
    loginUser,
    logoutUser,
} from '../../redux/actions/session'

const mapDispatchToProps = (dispatch) => ({
    createNewUser: (formUser) => dispatch(createNewUser(formUser)),
    loginUser: (user) => dispatch(loginUser(user)),
    logoutUser: () => dispatch(logoutUser()),
})

export default connect(null, mapDispatchToProps)(signupForm)
