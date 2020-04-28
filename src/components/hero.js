import React from "react";

const BASE_URL = `https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_auto`;

class Hero extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image_path: "",
      width: 0,
    };
  }

  componentDidMount = () => {
    this.setState(
      {
        width: window.innerWidth,
      },
      this.generateURL
    );
  };

  generateURL = () => {
    const { width } = this.state;

    const url = `${BASE_URL},w_${width}/${this.props.heroImages[0].node.public_id}`;

    this.setState({
      image_path: url,
    });
  };

  render = () => {
    return (
      <section class="hero">
        <div>
          <img src={this.state.image_path} alt="Autoportrait" />
        </div>
      </section>
    );
  };
}

export default Hero;
