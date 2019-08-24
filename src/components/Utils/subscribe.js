import React, { Component } from "react";
import axios from "axios";
import { EMAIL_URL } from "./paths";

export default class Subscribe extends Component {
  state = {
    email: "",
    error: false,
    success: false,
    alreadyIn: false
  };

  clearMessages = () => {
    setTimeout(() => {
      this.setState({
        error: false,
        success: false,
        alreadyIn: false
      });
    }, 2000);
  };

  saveEmail = email => {
    axios.get(`${EMAIL_URL}?email=${email}`).then(response => {
      if (!response.data.length) {
        axios(EMAIL_URL, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          data: JSON.stringify({ email })
        }).then(response => {
          this.setState({
            email: "",
            success: true
          });
          this.clearMessages();
        });
      } else {
        this.setState({
          email: "",
          alreadyIn: true
        });
        this.clearMessages();
      }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let email = this.state.email;
    let re = /\S+@\S+\.\S+/;

    if (re.test(email)) {
      this.saveEmail(email);
    } else {
      this.setState({ error: true });
    }

    this.clearMessages();
  };

  onChangeInput = event => {
    this.setState({ email: event.target.value });
  };

  render() {
    const state = this.state;
    return (
      <div className="subcribe_panel">
        <h3>Subscribe to us</h3>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={state.email}
              placeholder="youremail@gmail.com"
              onChange={this.onChangeInput}
            />
            <div className={state.error ? "error show" : "error"}>
              check your email
            </div>
            <div className={state.success ? "success show" : "success"}>
              Thank you
            </div>
            <div className={state.alreadyIn ? "success show" : "success"}>
              You are already on the db
            </div>
          </form>
        </div>
        <small></small>
      </div>
    );
  }
}
