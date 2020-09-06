import React from "react";

const BASE_URL = `https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_auto/r-breslin-cloudinary`;

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 0,
    };
  }

  componentDidMount() {
    setInterval(() => {
      const len = this.props.images.length;
      const { active } = this.state;

      if (active === len - 1) {
        this.setState({ active: 0 });
      } else {
        this.setState({ active: this.state.active + 1 });
      }
    }, 5000);
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
              <img src={BASE_URL + "/" + path} alt="" />
              <figcaption></figcaption>
            </figure>
          );
        })}
      </section>
    );
  };
}

export default Carousel;
