import { connect } from 'react-redux'
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
