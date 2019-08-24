import React, { Component } from "react";
import axios from "axios";
import { HOME_URL } from "../Utils/paths";
import SliderWidget from "../Utils/slider";
import Subscribe from "../Utils/subscribe";
import Blocks from "./blocks";
import Poll from "./poll";

export default class Home extends Component {
  state = {
    home: ""
  };

  componentDidMount() {
    axios.get(HOME_URL).then(response => {
      this.setState({ home: response.data });
    });
  }

  render() {
    return (
      <div>
        <SliderWidget slides={this.state.home.slider} />
        <Subscribe />
        <Blocks blocks={this.state.home.blocks} />
        <Poll />
      </div>
    );
  }
}
