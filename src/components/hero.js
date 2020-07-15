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
    const { blurb } = this.props;

    return (
      <section className="hero">
        <div className="image">
          <img src={this.state.image_path} alt="Autoportrait" />
        </div>
        <div className="text">
          <p>{blurb}</p>
          <a href="#cards">Selected Work</a>
        </div>
      </section>
    );
  };
}

export default Hero;
