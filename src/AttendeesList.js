import React, { Component } from "react";
import { GoTrashcan, GoStar,GoMail } from "react-icons/go";
import db from "./db";

export class AttendeesList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.deleteAttendee = this.deleteAttendee.bind(this);
    this.toggleStar = this.toggleStar.bind(this);
  }

  toggleStar(e, star, meetingId, Id) {
    e.preventDefault();
    db.collection("users")
      .doc(this.props.adminUser)
      .collection("meetings")
      .doc(meetingId)
      .collection("attendees")
      .doc(Id)
      .update({
        star: !star,
      });
  }

  deleteAttendee(e, meetingId, Id) {
    db.collection("users")
      .doc(this.props.adminUser)
      .collection("meetings")
      .doc(meetingId)
      .collection("attendees")
      .doc(Id)
      .delete();
  }

  render() {
    const attendees = this.props.attendees;
    const admin = this.props.adminUser === this.props.userID;
    return (
      <div className="row justify-content-center">
        {attendees.map((item) => (
          <div
            className="col-8 col-sm-6 col-md-4 col-lg-3 mb-2 p-0 px-1"
            key={item.attendeeID}
          >
            <div className="card">
              <div
                className={
                  "card-body px-3 py-2 d-flex " +
                  (admin ? "" : "justify-content-center")
                }
              >
                {admin && (
                  <div className="btn-group pr-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      title="Delete Attendee"
                      onClick={(e) =>
                        this.deleteAttendee(
                          e,
                          this.props.meetingID,
                          item.attendeeID
                        )
                      }
                    >
                      <GoTrashcan />
                    </button>
                    <a
                      href={'mailto:' + item.attendeeEmail}
                      className="btn btn-sm btn-outline-secondary"
                    ><GoMail/></a>
                    <button
                      className={
                        "btn btn-sm " +
                        (item.star
                          ? "btn-outline-secondary text-warning"
                          : "btn-outline-secondary")
                      }
                      title="Star Attendee"
                      onClick={(e) =>
                        this.toggleStar(
                          e,
                          item.star,
                          this.props.meetingID,
                          item.attendeeID
                        )
                      }
                    >
                      <GoStar />
                    </button>
                  </div>
                )}
                <div>{item.attendeeName}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default AttendeesList;
