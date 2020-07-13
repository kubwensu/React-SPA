import React, { Component } from "react";
import { GoTrashcan, GoListUnordered } from "react-icons/go";
import { FaLink } from "react-icons/fa";
import db from "./db";
import { navigate } from "@reach/router";

export class MeetingsList extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.deleteMeeting = this.deleteMeeting.bind(this);
  }

  deleteMeeting(e, id) {
    e.preventDefault();
    db.collection("users")
      .doc(this.props.userID)
      .collection("meetings")
      .doc(id)
      .delete()
      .then(() => {
        console.log("successfully deleted");
      });
  }

  render() {
    const { meetings } = this.props;
    return (
      <div>
        {meetings.map((meeting) => (
          <div className="list-group-item d-flex" key={meeting.id}>
            <section
              className="btn-group align-self-center"
              role="group"
              arial-label="meeting options"
            >
              <button
                className="btn btn-sm btn-outline-secondary"
                title="Delete Meeting"
                onClick={(e) => this.deleteMeeting(e, meeting.id)}
              >
                <GoTrashcan />
              </button>{" "}
              <button
                className="btn btn-sm btn-outline-secondary"
                title="Check In"
                onClick={() => navigate(`/checkin/${this.props.userID}/${meeting.id}`)}
              >
                <FaLink />
              </button> <button
                className="btn btn-sm btn-outline-secondary"
                title="Attendees List"
                onClick={() => navigate(`/attendees/${this.props.userID}/${meeting.id}`)}
              >
                <GoListUnordered />
              </button>
            </section>

            <section className="pl-3 text-left align-self-center">
              {meeting.name}
            </section>
          </div>
        ))}
      </div>
    );
  }
}

export default MeetingsList;
