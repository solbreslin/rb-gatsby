import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

class Header extends React.Component {
  render = () => {
    const { siteTitle } = this.props;

    return (
      <header className="rb-header">
        <Link to="/">{siteTitle}</Link>
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
