import { connect } from 'react-redux'
import signupForm from './signup_form'
import {
    createNewUser,
} from '../../redux/actions/session'

const mapDispatchToProps = (dispatch) => ({
    createNewUser: (formUser) => dispatch(createNewUser(formUser)),
})

export default connect(null, mapDispatchToProps)(signupForm)
