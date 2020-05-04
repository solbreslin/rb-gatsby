import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import Headroom from "react-headroom";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.headerEl = React.createRef();
    this.state = {
      height: 0,
    };
  }

  componentDidMount = () => {
    this.setState(
      {
        height: this.calcHeaderHeight(),
      },
      this.setCSSCustomProp
    );
  };

  calcHeaderHeight = () => {
    return this.headerEl.clientHeight;
  };

  setCSSCustomProp = () => {
    const { height } = this.state;

    const root = document.documentElement;
    root.style.setProperty("--header-height", `${height}px`);
  };

  render = () => {
    const { siteTitle, menuLinks } = this.props;

    return (
      <Headroom>
        <header ref={element => (this.headerEl = element)}>
          <nav>
            <ul>
              {menuLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.link} activeClassName="active">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link to="/" className="brand">
            {siteTitle}
          </Link>
        </header>
      </Headroom>
    );
  };
}

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: "",
};

export default Header;
