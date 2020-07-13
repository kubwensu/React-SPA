import React, { Component } from 'react'
import {navigate} from "@reach/router";
import db from './db'

export class CheckIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
          displayName: "",
          email: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleSubmit(e) {
        e.preventDefault();

        db.collection("users").doc(this.props.userID).collection("meetings").doc(this.props.meetingID).collection("attendees").add({
            attendeeName: this.state.displayName,
            attendeeEmail: this.state.email
        }).then(() => {
            navigate(`/attendees/${this.props.userID}/${this.props.meetingID}`)
        })


      }
    
      handleChange(e) {
        const item = e.target.name;
        const value = e.target.value;
        this.setState({
          [item]: value,
        });
      }
    render() {
        return (
            <form className="mt-3" onSubmit={this.handleSubmit}>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="card bg-light">
                    <div className="card-body">
                      <h3 className="font-weight-light mb-3">Check in</h3>
                      <section className="form-group">
                        <label
                          className="form-control-label sr-only"
                          htmlFor="displayName"
                        >
                          Name
                        </label>
                        <input
                          required
                          className="form-control"
                          type="text"
                          id="displayName"
                          name="displayName"
                          placeholder="Name"
                          value={this.state.displayName}
                          onChange={this.handleChange}
                        />
                      </section>
                      <section className="form-group">
                        <label
                          className="form-control-label sr-only"
                          htmlFor="Email"
                        >
                          Email
                        </label>
                        <input
                          required
                          className="form-control"
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Email"
                          value={this.state.email}
                          onChange={this.handleChange}
                        />
                      </section>
                      <div className="form-group text-right mb-0">
                        <button className="btn btn-primary" type="submit">
                          Check in
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )
    }
}

export default CheckIn
