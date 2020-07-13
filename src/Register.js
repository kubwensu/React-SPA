import React, { Component } from "react";
import firebase from "firebase";
import FormError from "./FormError";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: "",
      email: "",
      passOne: "",
      passTwo: "",
      errorMessage: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var registrationInfo = {
      displayName: this.state.displayName,
      email: this.state.email,
      password: this.state.passTwo,
    };

    firebase
    .auth()
    .createUserWithEmailAndPassword(
      registrationInfo.email,
      registrationInfo.password
    )
    .then(() => {
      this.props.registerUser(registrationInfo.displayName);
    })
    .catch(error => {
      if (error.message !== null) {
        this.setState({ errorMessage: error.message });
      } else {
        this.setState({ errorMessage: null });
      }
    });
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        if (this.state.passOne !== this.state.passTwo) {
          this.setState({
            errorMessage: "Passwords must match",
          });
        } else {
          this.setState({
            errorMessage: null,
          });
        }
      }
    );
  }

  render() {
    return (
      <div>
        <form className="mt-3" onSubmit={this.handleSubmit}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="card bg-light">
                  <div className="card-body">
                    <h3 className="font-weight-light mb-3">Register</h3>
                    {this.state.errorMessage !== null ? (
                      <FormError err={this.state.errorMessage} />
                    ) : null}
                    <div className="form-row">
                      <section className="col-sm-12 form-group">
                        <label
                          className="form-control-label sr-only"
                          htmlFor="displayName"
                        >
                          Display Name
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="displayName"
                          placeholder="Display Name"
                          name="displayName"
                          required
                          onChange={this.handleChange}
                        />
                      </section>
                    </div>
                    <section className="form-group">
                      <label
                        className="form-control-label sr-only"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className="form-control"
                        type="email"
                        id="email"
                        placeholder="Email Address"
                        required
                        onChange={this.handleChange}
                        name="email"
                      />
                    </section>
                    <div className="form-row">
                      <section className="col-sm-6 form-group">
                        <input
                          className="form-control"
                          type="password"
                          name="passOne"
                          placeholder="Password"
                          onChange={this.handleChange}
                        />
                      </section>
                      <section className="col-sm-6 form-group">
                        <input
                          className="form-control"
                          type="password"
                          required
                          onChange={this.handleChange}
                          name="passTwo"
                          placeholder="Repeat Password"
                        />
                      </section>
                    </div>
                    <div className="form-group text-right mb-0">
                      <button className="btn btn-primary" type="submit">
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
