import React from "react";

class Footer extends React.Component {
  render = () => {
    return (
      <footer className="rb-footer">
        <p>© Rory Breslin 2020</p>
        <p>Co. Mayo, Ireland</p>
        <p><a href="mailto@hello@rorybreslin.com">hello@rorybreslin.com</a></p>
        <a href="#top">
          Top
          <span>
            <svg
              className="ui-arrow__svg"
              xmlns="http://www.w3.org/2000/svg"
              x="0"
              y="0"
              viewBox="0 0 14.5 8.18"
              style={{ transform: "rotate(-90deg)" }}
            >
              <line
                stroke="#2B2B2B"
                strokeMiterlimit="10"
                x1="0"
                y1="4.09"
                x2="13.42"
                y2="4.09"
              ></line>
              <polygon
                fill="#2B2B2B"
                points="10.1,8.18 9.42,7.45 13.03,4.09 9.42,0.73 10.1,0 14.5,4.09"
              ></polygon>
            </svg>
          </span>
        </a>
      </footer>
    );
  };
}

export default Footer;
