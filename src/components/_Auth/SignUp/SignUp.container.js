import { connect } from 'react-redux'

import { signUp, updateAuth } from 'state/auth/actions'
import { getAuthData, getIsLoading, getUsers } from 'state/auth/selectors'

import SignUp from './SignUp'

const mapStateToProps = state => ({
  authData: getAuthData(state),
  loading: getIsLoading(state),
  users: getUsers(state),
})

const mapDispatchToProps = {
  signUp,
  updateAuth,
}

const SignUpContainer = connect(mapStateToProps, mapDispatchToProps)(SignUp)

export default SignUpContainer
