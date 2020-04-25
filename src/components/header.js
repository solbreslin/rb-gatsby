import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

const Header = ({ siteTitle, menuLinks }) => (
  <header>
    <nav>
      <Link to="/">{siteTitle}</Link>
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
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: "",
};

export default Header;
