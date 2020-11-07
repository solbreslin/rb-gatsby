import React from "react";
import PropTypes from "prop-types";
// import Menu from "./menu/menu";
import Footer from "./footer";
import "./../styles/global.scss";
import Header from "./header";

class Layout extends React.Component {
  render = () => {
    const { children, className } = this.props;

    return (
      <>
        <span id="top"></span>
        {/* <Menu /> */}
        <Header />
        <main className={className}>{children}</main>
        <Footer />
      </>
    );
  };
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
