import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";

const Nav = ({ menuOpen }) => {
  const data = useStaticQuery(graphql`
    query MenuItems {
      site {
        siteMetadata {
          menuLinks {
            link
            name
          }
        }
      }
    }
  `);

  return (
    <nav className={`${menuOpen ? "open" : ""} rb-nav`}>
      <ul>
        {/* <li>
          <Link to={"/"} activeClassName="active">
            Home
          </Link>
        </li> */}
        {data.site.siteMetadata.menuLinks.map((item, i) => {
          return (
            <li key={item + "-" + i}>
              <Link to={item.link} activeClassName="active">
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <footer>
        <p>Mayo, Ireland</p>
        <a href="mailto:info@rorybreslin.com">info@rorybreslin.com</a>
      </footer>
    </nav>
  );
};

export default Nav;
