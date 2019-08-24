import React, { Component } from "react";
import axios from "axios";
import { TEAMS_URL } from "../Utils/paths";

export default class Poll extends Component {
  state = {
    pollTeams: []
  };

  getPoll() {
    axios
      .get(`${TEAMS_URL}?poll=true&_sort=count&_order=desc`)
      .then(response => {
        this.setState({ pollTeams: response.data });
      });
  }

  componentDidMount() {
    this.getPoll();
  }

  addCount(count, id) {
    axios(`${TEAMS_URL}/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: JSON.stringify({ count: count + 1 })
    }).then(response => {
      this.getPoll();
    });
  }

  renderPoll() {
    return this.state.pollTeams.map((item, index) => (
      <div
        key={index}
        className="poll_item"
        onClick={() => this.addCount(item.count, item.id)}
      >
        <img alt={item.team} src={`/images/teams/${item.logo}`} />
        <div>{item.count} Votes</div>
      </div>
    ));
  }

  render() {
    return (
      <div className="home_poll">
        <h3>Who will be the next champion ?</h3>
        <div className="poll_container">{this.renderPoll()}</div>
      </div>
    );
  }
}
