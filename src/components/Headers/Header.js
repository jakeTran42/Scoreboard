import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { AUTH_TOKEN } from '../AUTH/constants';

class Header extends Component {
  render() {

    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div className="flex pa1 justify-between nowrap pad black">
        <div className="flex flex-fixed white">
          <div onClick={() => this.props.history.push('/')} className="fw7 mr1">Scoreboard</div>

          <Link to="/game/search" className="ml1 no-underline white">
            search |
          </Link>

          <Link to="/reviews" className="ml1 no-underline white">
            reviews
          </Link>

          {authToken && (
          <div className="flex">
            <div className="ml1">|</div>
              <Link to="/create" className="ml1 no-underline white">
                submit
              </Link>
            </div>
          )}
        </div>

        <div className="flex flex-fixed">
          {authToken ? (
            <div className="ml1 pointer white"
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN)
                this.props.history.push(`/`)}}>
              Logout
            </div>) 
            : (<Link to="/login" className="ml1 no-underline white">
                login
              </Link>)}
        </div>

      </div>
    )
  }
}

export default withRouter(Header)