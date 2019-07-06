import React, { Component } from 'react'
import { AUTH_TOKEN } from './constants'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag';
import './Login.css'

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($username: String!, $email: String!, $password: String!, $name: String!) {
    signup(username: $username, email: $email, password: $password, name: $name) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($loginIdentifier: String!, $password: String!) {
    login(loginIdentifier: $loginIdentifier, password: $password) {
      token
    }
  }
`

class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    username: '',
    email: '',
    loginIdentifier: '',
    password: '',
    name: '',
  }

  render() {
    const { login, username, email, loginIdentifier, password, name } = this.state
    return (
      <div className="auth-container">
        <div className="auth-wrapper">
          <h4 className="auth-status">{login ? 'Login' : 'Sign Up'}</h4>

          <div className="auth-input-form">
              {!login && ( //Inline If with Logical && Operator
                  <div className="username-auth">
                      <label>Name</label>&nbsp;
                      <input
                      className="login-name-input"
                      value={name}
                      onChange={e => this.setState({ name: e.target.value })}
                      type="text"
                      placeholder="Your name"
                      />&nbsp;
                      <label>Username</label>&nbsp;
                      <input
                      className="login-username-input"
                      value={username}
                      onChange={e => this.setState({ username: e.target.value })}
                      type="text"
                      placeholder="Your username"
                      />&nbsp;
                  </div>
              )}

              {!login 
                  ? <div className="identifier-form">
                      <label>Email</label>
                      <input
                      className="login-email-input"
                      value={email}
                      onChange={e => this.setState({ email: e.target.value })}
                      type="text"
                      placeholder="Email"
                      /> 
                    </div>
                  : <div className="identifier-form">
                      <label>Email or Username</label>
                      <input
                      className="login-user-input"
                      value={loginIdentifier}
                      onChange={e => this.setState({ loginIdentifier: e.target.value })}
                      type="text"
                      placeholder="Username or Email"
                      />
                  </div>
              }

              <div className="password-form">
                <label>Password</label>
                <input
                  value={password}
                  className="login-password-input"
                  onChange={e => this.setState({ password: e.target.value })}
                  type="password"
                  placeholder="Password"
                />
              </div>
          </div>

          <div className="auth-submit-btns">

              <Mutation
                  mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                  variables={login ? {loginIdentifier, password} : { username, email, password, name }}
                  onCompleted={data => this._confirm(data)}>
                  {(authMutation, {loading, error}) => (
                    <div>
                      {loading && <p style={{color: 'aliceblue'}}>Loading...</p>}
                      {error && <div>Error...</div>}
                      <div className="login-btns" onClick={authMutation}>
                        {login ? 'Login' : 'Create Account'}
                      </div>
                    </div>
                  )}
              </Mutation>

              <div
                  className="auth-status-btn"
                  onClick={() => this.setState({ login: !login })}>
                  {login
                  ? 'need to create an account?'
                  : 'Already have an account?'}
              </div>
          </div>
        </div>
      </div>
    )
  }

  _confirm = async (data) => {
    const { token } = this.state.login ? data.login : data.signup
    this._saveUserData(token)
    this.props.history.push(`/`)
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

export default Login;