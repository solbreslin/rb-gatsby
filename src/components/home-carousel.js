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
          console.log(d);
          return (
            <figure
              key={index}
              className={this.state.activeIndex === index ? "active" : ""}
            >
              <img src={BASE_URL + d.carousel_image} alt="" />
              <figcaption>
                <Link to={d.path}>
                  {d.display_name}
                  <svg
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path>
                    </g>
                  </svg>
                </Link>
              </figcaption>
            </figure>
          );
        })}
      </section>
    );
  };
}

export default Carousel;
