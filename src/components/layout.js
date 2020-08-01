import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";

import Header from "./header";
import Footer from "./footer";
import "./../styles/global.scss";

class Layout extends React.Component {
  render = () => {
    const { children, className } = this.props;

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
