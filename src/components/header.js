import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const HeaderEl = styled.header`
  left: 0;
  position: fixed;
  top: 0;
  z-index: 1;
`;

const Menu = styled.ul`
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.li`
  display: flex;
`;

const Header = ({ siteTitle, menuLinks }) => (
  <HeaderEl>
    <Link to="/">{siteTitle}</Link>
    <Menu>
      {menuLinks.map(link => (
        <MenuItem key={link.name}>
          <Link to={link.link}>{link.name}</Link>
        </MenuItem>
      ))}
    </Menu>
  </HeaderEl>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: "",
};

export default Header;
