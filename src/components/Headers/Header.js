import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { AUTH_TOKEN } from '../AUTH/constants';
import './Header.css'

class Header extends Component {
  render() {

    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div className="header-container">
        <div className="header-links">
          <div onClick={() => this.props.history.push('/')} style={{color: "#f4426b"}}>Scoreboard</div>

          {/* <Link to="/game/search" className="ml1 no-underline white" >
            Search 
          </Link> */}

          <Link to="/reviews" className="ml1 no-underline white">
            Reviews
          </Link>

          {authToken && (
          <div className="flex">
            {/* <div className="ml1">|</div> */}
              <Link to="/create" className="ml1 no-underline white">
                Submit
              </Link>
            </div>
          )}
        </div>

        <div className="header-auth">
          {authToken ? (
            <div className="ml1 pointer white"
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN)
                this.props.history.push(`/`)}}>
              Logout
            </div>) 
            : (<Link to="/login" className="ml1 no-underline white">
                Login
              </Link>)}
        </div>

      </div>
    )
  }
}

export default withRouter(Header)