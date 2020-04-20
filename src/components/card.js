import React from "react";
// import styled from "styled-components";
import { Link } from "gatsby";

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.name = this.props.name;
    this.link = this.props.link;
  }

  render = () => {
    return <Link to={this.link}>{this.name}</Link>;
  };
}

export default Card;
