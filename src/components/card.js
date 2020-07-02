import React from "react";
import { Link } from "gatsby";

const BASE_URL =
  "https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_40,w_500/";

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.name = this.props.name;
    this.link = this.props.link;
    this.image = this.props.image;
  }

  render = () => {
    return (
      <Link to={"work"} state={{ category: this.name }} className="card">
        <figure>
          <img src={BASE_URL + this.image} alt="" />
          <figcaption>{this.name}</figcaption>
        </figure>
      </Link>
    );
  };
}

export default Card;
