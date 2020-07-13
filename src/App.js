import React, { Component } from "react";
import { Router, navigate } from "@reach/router";
import firebase from "firebase";

import Home from "./Home";
import Welcome from "./Welcome";
import Navigation from "./Navigation";
import Login from "./Login.js";
import Register from "./Register";
import Meetings from "./Meetings";
import CheckIn from "./CheckIn";
import Attendees from "./Attendees";
import db from "./db";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      displayName: "",
      userID: null,
      meetings: [],
      howManyMeetings: null,
    };
    this.registerUser = this.registerUser.bind(this);
    this.logout = this.logout.bind(this);
    // this.login = this.login.bind(this)
    this.addMeeting = this.addMeeting.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((FBUser) => {
      if (FBUser) {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid,
        });
        db.collection("users")
          .doc(this.state.userID)
          .collection("meetings")
          .onSnapshot((snapshot) => {
            let meetingsSnapshot = [];
            snapshot.forEach((doc) => {
              meetingsSnapshot.push({
                id: doc.id,
                name : doc.data().meetingName});
            });
            this.setState({
              meetings: meetingsSnapshot,
              howManyMeetings: meetingsSnapshot.length,
            }); 
          });   
      }
    });
  }

  logout(e) {
    e.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({
          user: null,
          displayName: "",
          userID: null,
        });
        navigate("/login");
      });
  }

  // login() {
  //   firebase.auth().onAuthStateChanged(FBUser => {
  //     this.setState({
  //       user: FBUser,
  //       displayName: FBUser.displayName,
  //       userID: FBUser.uid
  //     })
  //   })
  // }

  registerUser(userName) {
    firebase.auth().onAuthStateChanged((FBUser) => {
      FBUser.updateProfile({
        displayName: userName,
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid,
        });
        navigate("/meetings");
      });
    });
  }

  addMeeting(meetingName) {
    db.collection("users")
      .doc(`${this.state.userID}`)
      .collection("meetings")
      .add({
        meetingName: meetingName,
      });
  }

  render() {
    return (
      <div>
        <Navigation logout={this.logout} user={this.state.user} />
        {this.state.user === null ? null : (
          <Welcome logout={this.logout} user={this.state.displayName} />
        )}
        <Router>
          <Home path="/" userName={this.state.user} />
          <Login path="/login" />
          <CheckIn path="/checkin/:userID/:meetingID"/>
          <Attendees path="/attendees/:userID/:meetingID" adminUser={this.state.userID}/>
          <Meetings path="/meetings" userID={this.state.userID} meetings={this.state.meetings} addMeeting={this.addMeeting} />
          <Register path="/register" registerUser={this.registerUser} />
        </Router>
      </div>
    );
  }
}

export default App;
