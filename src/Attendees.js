import React, { Component } from "react";
import db from "./db";
import AttendeesList from "./AttendeesList";
import { FaUndo, FaRandom } from "react-icons/fa";

export class Attendees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayAttendees: [],
      allAttendees: [],
      searchQuery: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.resetQuery = this.resetQuery.bind(this);
    this.chooseRandom = this.chooseRandom.bind(this);
  }

  handleChange(e) {
    const item = e.target.name;
    const value = e.target.value;
    this.setState({
      [item]: value,
    });
  }

  chooseRandom() {
    const rando = Math.floor(Math.random()*this.state.allAttendees.length)
    this.resetQuery();
    this.setState({
        displayAttendees: [this.state.allAttendees[rando]]
    })
  }

  resetQuery(e) {
    this.setState({
        displayAttendees: this.state.allAttendees,
      searchQuery: "",
    });
  }

  componentDidMount() {
    db.collection("users")
      .doc(this.props.userID)
      .collection("meetings")
      .doc(this.props.meetingID)
      .collection("attendees")
      .onSnapshot((snapData) => {
        let attendeeList = [];
        snapData.forEach((doc) => {
          attendeeList.push({
            attendeeID: doc.id,
            attendeeName: doc.data().attendeeName,
            attendeeEmail: doc.data().attendeeEmail,
            star: doc.data().star,
          });
        });
        this.setState({
          displayAttendees: attendeeList,
          allAttendees: attendeeList
        });
      });
  }

  render() {
    const filteredAttendees = this.state.displayAttendees.filter((attendee) =>
      attendee.attendeeName
        .toLowerCase()
        .match(this.state.searchQuery.toLowerCase())
    );
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="font-weight-light text-center">Attendees</h1>
            <div className="card bg-light mb-4">
              <div className="card-body text-center">
                <div className="input-group input-group-lg">
                  <input
                    type="text"
                    name="searchQuery"
                    value={this.state.searchQuery}
                    onChange={this.handleChange}
                    placeholder="Search Attendees"
                    className="form-control"
                  />
                  <div className="input-group-append">
                  <button
                      className="btn btn-outline-info btn-sm"
                      onClick={this.chooseRandom}
                    >
                      <FaRandom />
                    </button>
                    <button
                      className="btn btn-outline-info btn-sm"
                      onClick={this.resetQuery}
                    >
                      <FaUndo />
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AttendeesList
          attendees={filteredAttendees}
          adminUser={this.props.adminUser}
          meetingID={this.props.meetingID}
          userID={this.props.userID}
        />
      </div>
    );
  }
}

export default Attendees;
