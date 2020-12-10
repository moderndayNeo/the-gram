import { connect } from 'react-redux'
import loginForm from './login_form'
import { loginUser } from '../../redux/actions/session'

const mapDispatchToProps = (dispatch) => ({
    loginUser: (formUser) => dispatch(loginUser(formUser)),
})

export default connect(null, mapDispatchToProps)(loginForm)
