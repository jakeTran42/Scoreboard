import React, { Component } from 'react'
import { AUTH_TOKEN } from './constants'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag';

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
      <div>
        <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>

        <div className="flex flex-column">
            {!login && ( //Inline If with Logical && Operator
                <div>
                    <input
                    value={name}
                    onChange={e => this.setState({ name: e.target.value })}
                    type="text"
                    placeholder="Your name"
                    />
                    <input
                    value={username}
                    onChange={e => this.setState({ username: e.target.value })}
                    type="text"
                    placeholder="Your username"
                    />
                </div>
            )}

            {!login 
                ? <input
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
                type="text"
                placeholder="Email"
                /> 
                : <input
                value={loginIdentifier}
                onChange={e => this.setState({ loginIdentifier: e.target.value })}
                type="text"
                placeholder="Username or Email"
                />}

            <input
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
                type="password"
                placeholder="Choose a safe password"
            />
        </div>

        <div className="flex mt3">

            <Mutation
                mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                variables={login ? {loginIdentifier, password} : { username, email, password, name }}
                onCompleted={data => this._confirm(data)}>
                {(authMutation, {loading, error}) => (
                  <div>
                    {loading && <p>Loading...</p>}
                    {error && <div>{console.log(error.graphQLErrors[0].message)}</div>}
                    <div className="pointer mr2 button" onClick={authMutation}>
                      {login ? 'login' : 'create account'}
                    </div>
                  </div>
                )}
            </Mutation>

            <div
                className="pointer button"
                onClick={() => this.setState({ login: !login })}>
                {login
                ? 'need to create an account?'
                : 'already have an account?'}
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