import React from "react";

const BASE_URL = `https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_auto`;

class Hero extends React.Component {
  render = () => {
    const { blurb, heroImage: image } = this.props;

    return (
      <section className="hero">
        <div className="image">
          <img src={`${BASE_URL}/${image}`} alt="Autoportrait" />
        </div>
        <div className="text">
          <p>{blurb}</p>
        </div>
        <div className="hero-overlay"></div>
      </section>
    );
  };
}

export default Hero;
