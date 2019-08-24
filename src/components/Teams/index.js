import React, { Component } from "react";
import axios from "axios";
import { TEAMS_URL } from "../Utils/paths";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Link } from "react-router-dom";

export default class Teams extends Component {
  state = {
    teams: [],
    filtered: [],
    keyword: ""
  };

  componentDidMount() {
    axios.get(TEAMS_URL).then(response => {
      this.setState({ teams: response.data, filtered: response.data });
    });
  }

  renderList = filtered =>
    filtered.map((item, index) => (
      <CSSTransition key={index} timeout={500} classNames="fade">
        <Link to={`teams/${item.name}`} className="team_item">
          <img alt={item.name} src={`/images/teams/${item.logo}`} />
        </Link>
      </CSSTransition>
    ));

  getFilteredTeam = event => {
    const keyword = event.target.value;
    if (keyword !== "") {
      const list = this.state.teams.filter(item => {
        return item.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
      });
      this.setState({ filtered: list, keyword });
    } else {
      this.setState({
        filtered: this.state.teams,
        keyword
      });
    }
  };

  render() {
    console.log(this.state.filtered);
    return (
      <div className="teams_component">
        <div className="teams_input">
          <input
            type="text"
            value={this.state.keyword}
            onChange={e => this.getFilteredTeam(e)}
            placeholder="search for a team"
          />
          <div className="teams_container">
            <TransitionGroup component="span">
              {this.renderList(this.state.filtered)}
            </TransitionGroup>
          </div>
        </div>
      </div>
    );
  }
}
