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
    document.documentElement.style.setProperty("--header-height", `${headerHeight}px`);
  }

  componentWillUnmount() {
    document.body.classList.remove("mobile-menu-open");
  }

  toggleMenu = () => {
    this.setState(prevState => ({
      menuOpen: !prevState.menuOpen,
    }));

    document.body.classList.toggle("mobile-menu-open");
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
        <Link to="/" className="brand">{siteTitle}</Link>
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
