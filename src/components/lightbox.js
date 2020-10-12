import React from "react";

const BASE_URL = `https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_auto/r-breslin-cloudinary/`;

class Lightbox extends React.Component {
  render = () => {
    const { src } = this.props;

    const onLightboxClick = () => {
      this.props.onLightboxClick();
    };

    return (
      <div className="rb-lightbox">
        <img
          src={`${BASE_URL}${src}`}
          alt="Fullscreen Image"
          onClick={() => onLightboxClick()}
        />
      </div>
    );
  };
}

export default Lightbox;
