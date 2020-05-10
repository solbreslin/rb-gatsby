import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";

import Header from "./header";
import Nav from "./nav";
import Footer from "./footer";
import "./../styles/global.scss";

class Layout extends React.Component {
  render = () => {
    const { children } = this.props;

    return (
      <>
        <span id="top"></span>
        <StaticQuery
          query={graphql`
            query {
              site {
                siteMetadata {
                  title
                }
              }
            }
          `}
          render={data => <Header siteTitle={data.site.siteMetadata.title} />}
        />
        <Nav />
        <main>{children}</main>
        <Footer />
      </>
    );
  };
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
