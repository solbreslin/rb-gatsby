import React from "react";

const BASE_URL = `https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_auto/r-breslin-cloudinary/`;

const TRANSITION_TIME = 5000;

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 0,
    };
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    setInterval(() => {
      const { length } = this.props.images;
      const { active } = this.state;

      const reset = active === length - 1 ? true : false;

      this.setState({
        active: reset ? 0 : this.state.active + 1,
      });
    }, TRANSITION_TIME);
  }

  render = () => {
    return (
      <section className="rb-home-carousel">
        {this.props.images.map((path, index) => {
          return (
            <figure
              key={index}
              className={this.state.active === index ? "active" : ""}
            >
              <img src={BASE_URL + path} alt="" />
              <figcaption></figcaption>
            </figure>
          );
        })}
      </section>
    );
  };
}

export default Carousel;
