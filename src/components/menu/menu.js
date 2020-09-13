import React from "react";
import { StaticQuery, graphql } from "gatsby";

import MenuDesktop from "./menu-desktop";
import MenuMobile from "./menu-mobile";

const Menu = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
              menuLinks {
                link
                name
              }
            }
          }
          allWorkJson {
            edges {
              node {
                path
                display_name
              }
            }
          }
        }
      `}
      render={data => (
        <>
          <MenuDesktop
            siteTitle={data.site.siteMetadata.title}
            items={data.site.siteMetadata.menuLinks}
            tags={data.allWorkJson.edges}
          />
          <MenuMobile
            siteTitle={data.site.siteMetadata.title}
            items={data.site.siteMetadata.menuLinks}
            tags={data.allWorkJson.edges}
          />
        </>
      )}
    />
  );
};

export default Menu;
