import { Link } from "gatsby";
import React from "react";

const BASE_URL = `https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_auto/r-breslin-cloudinary/`;

const TRANSITION_TIME = 7000;

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
    };
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    setInterval(() => {
      const { length } = this.props.data;
      const { activeIndex } = this.state;

      const reset = activeIndex === length - 1 ? true : false;

      this.setState({
        activeIndex: reset ? 0 : this.state.activeIndex + 1,
      });
    }, TRANSITION_TIME);
  }

  render = () => {
    return (
      <section className="rb-home-carousel">
        {this.props.data.map((d, index) => {
          return (
            <figure
              key={index}
              className={this.state.activeIndex === index ? "active" : ""}
            >
              <img src={BASE_URL + d.carousel_image} alt="" />
            </figure>
          );
        })}
        <div>
          <h1>Rory Breslin</h1>
          <h3>Artist | Sculptor</h3>
        </div>
      </section>
    );
  };
}

export default Carousel;
