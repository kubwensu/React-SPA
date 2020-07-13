import React, { Component } from 'react'
import {Link } from '@reach/router'

export class Welcome extends Component {
    render() {
        const {user, logout}  = this.props; 
        return (
            <div className="text-center">
                <span  className="text-secondary pl-1 font-weight-bold">Welcome {user}</span>,
                <Link to="/logout" className="text-primary pl-1 font-weight-bold" onClick={logout}>log out</Link>
            </div>
        )
    }
}

export default Welcome
