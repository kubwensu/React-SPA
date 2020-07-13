import React, { Component } from 'react'
import { FaUsers } from "react-icons/fa";
import { Link, navigate } from "@reach/router";


export class Navigation extends Component {

    render() {
        const {user, logout} = this.props;
        return (
            <nav className="site-nav family-sans navbar navbar-expand bg-primary navbar-dark higher">
            <div className="container-fluid">
              <Link to="/" className="navbar-brand">
                <FaUsers className="mr-1"/>Meeting Log
              </Link>
              <div className="navbar-nav ml-auto">
                  {user && (<Link className="nav-item nav-link" to="/meetings">
                    meetings
                  </Link>)}
                  { user == null ?<><Link className="nav-item nav-link" to="/login">
                    log in
                  </Link>
                  <Link className="nav-item nav-link" to="/register">
                    register
                  </Link></> : null}
                  {user && (<Link className="nav-item nav-link" to="/logout" onClick={logout}>
                    log out
                  </Link>)}
              </div>
            </div>
          </nav>
        )
    }
}

export default Navigation
