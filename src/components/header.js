import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import Menu from "./menu/menu";
import styled from "styled-components";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
    };
  }

  componentDidMount() {
    const headerHeight = this.headerEl.getBoundingClientRect().height;
    document.documentElement.style.setProperty(
      "--header-height",
      `${headerHeight}px`
    );
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
      <HeaderEl
        ref={headerEl => {
          this.headerEl = headerEl;
        }}
      >
        <Brand>
          <Link to="/" className="brand">
            Rory Breslin
          </Link>
        </Brand>
        <Menu />
        <button onClick={this.toggleMenu} className="hamburger-button">
          <span className="visually-hidden">{menuOpen ? "Close" : "Menu"}</span>
          <span className="hamburger"></span>
        </button>
      </HeaderEl>
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

const HeaderEl = styled.header`
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 1rem 3rem;
`;

const Brand = styled.div`
  display: flex;

  a {
    color: black;
    letter-spacing: 0.075em;
    text-decoration: none;
    text-transform: uppercase;
  }
`;
