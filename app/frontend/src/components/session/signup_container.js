import { connect } from 'react-redux'
import signupForm from './signup_form'
import {
    createNewUser,
} from '../../redux/actions/session_actions'

const mapStateToProps = state => ({
    errors: state.errors.session
})

const mapDispatchToProps = (dispatch) => ({
    createNewUser: (formUser) => dispatch(createNewUser(formUser)),
})

export default connect(mapStateToProps, mapDispatchToProps)(signupForm)
