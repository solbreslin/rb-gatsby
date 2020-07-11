import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import Nav from "./nav";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
    };
  }

  componentDidMount() {
    const headerHeight = this.headerEl.getBoundingClientRect().height;
    this.headerEl.style.setProperty("--header-height", `${headerHeight}px`);
  }

  componentWillUnmount() {
    document.body.classList.remove("overflow-hidden");
  }

  toggleMenu = () => {
    this.setState(prevState => ({
      menuOpen: !prevState.menuOpen,
    }));

    document.body.classList.toggle("overflow-hidden");
  };

  render = () => {
    const { siteTitle } = this.props;
    const { menuOpen } = this.state;

    return (
      <header
        ref={headerEl => {
          this.headerEl = headerEl;
        }}
        className="rb-header"
      >
        <Link to="/">{siteTitle}</Link>
        <button onClick={this.toggleMenu}>{menuOpen ? "Close" : "Menu"}</button>
        <Nav menuOpen={menuOpen} />
      </header>
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
