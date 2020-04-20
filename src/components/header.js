import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import MenuData from "../../content/menu.json";

const HeaderEl = styled.header`
  left: 0;
  position: fixed;
  top: 0;
  z-index: 1;
`;

const Header = ({ siteTitle }) => (
  <HeaderEl>
    <Link to="/">{siteTitle}</Link>
    <ul>
      {MenuData.items.map((data, index) => {
        return (
          <li key={`menu_item_${index}`}>
            <Link to="/{{data}}">{data}</Link>
          </li>
        );
      })}
    </ul>
  </HeaderEl>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: "",
};

export default Header;
