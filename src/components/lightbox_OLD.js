import React from "react";
import { Link } from "gatsby";

const BASE_URL =
  "https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_auto";

const CloudinaryParams = {
  HEIGHT: "h_",
  WIDTH: "w_",
};

const LightboxSettings = {
  PADDING_TOP: 50,
  PADDING_BOTTOM: 100,
};

class Lightbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 0,
    };

    this.projectTitle = props.title;
    this.height = 0;
    this.total = 0;
  }

  setHeight() {
    if (window) {
      this.height = window.innerHeight;
    }

  }

  isPortrait(image) {
    return image.height > image.width ? true : false;
  }

  generateImages() {
    if (!this.height) {
      this.setHeight();
    }
    const images = [];
    const height =
      this.height -
      LightboxSettings.PADDING_TOP -
      LightboxSettings.PADDING_BOTTOM;

    this.props.images.forEach(image => {
      let param = `,${CloudinaryParams.HEIGHT}${height}/`;

      if (this.isPortrait(image)) {
      }

      const url = BASE_URL + param + image.url;
      images.push(url);
    });

    this.total = images.length;

    return images;
  }

  componentDidMount() {
    // this.setHeight();
    // this.generateImages();
  }

  prev = () => {
    this.setState({
      current: this.state.current - 1,
    });

    if (this.state.current <= 0) {
      this.setState({
        current: this.total - 1,
      });
    }
  };

  next = () => {
    this.setState({
      current: this.state.current + 1,
    });
    if (this.state.current >= this.total - 1) {
      this.setState({
        current: 0,
      });
    }
  };

  render = () => {
    const images = this.generateImages().map((url, index) => {
      return (
        <div key={index}>
          <img src={url} alt="" />
        </div>
      );
    });

    return (
      <div className="lightbox">
        <div className="lightbox-header">
          <Link to="/">x</Link>
        </div>
        <div className="lightbox-image">{images[this.state.current]}</div>
        <div className="lightbox-footer">
          <p>{this.projectTitle}</p>
          <p>
            {this.state.current + 1} / {this.total}
          </p>
        </div>
        <div className="lightbox-navigation">
          <button onClick={this.prev}>&larr;</button>
          <button onClick={this.next}>&rarr;</button>
        </div>
      </div>
    );
  };
}

export default Lightbox;
