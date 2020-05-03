import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";

import Header from "./header";
import Footer from "./footer";
import "./../styles/global.scss";

const debounce = fn => {
  let frame;

  return (...params) => {
    if (frame) {
      cancelAnimationFrame(frame);
    }
    frame = requestAnimationFrame(() => {
      fn(...params);
    });
  };
};

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.storeScroll = debounce(this.storeScroll.bind(this));
  }

  componentDidMount = () => {
    window.addEventListener("scroll", this.storeScroll);
  };

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.storeScroll);
  };

  storeScroll = () => {
    document.documentElement.style.setProperty("--scroll-y", window.scrollY);
  };

  render = () => {
    const { children } = this.props;

    return (
      <>
        <StaticQuery
          query={graphql`
            query {
              site {
                siteMetadata {
                  title
                  menuLinks {
                    name
                    link
                  }
                }
              }
            }
          `}
          render={data => (
            <Header
              menuLinks={data.site.siteMetadata.menuLinks}
              siteTitle={data.site.siteMetadata.title}
            />
          )}
        />
        <main>{children}</main>
        <Footer></Footer>
      </>
    );
  };
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
