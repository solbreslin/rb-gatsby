import React from "react";
import { Link } from "gatsby";

const Nav = ({ items }) => {
  return (
    <ul className="nav-menu">
      {items.map((item, i) => {
        return (
          <li key={item + "-" + i}>
            <Link to={item.link} activeClassName="active">
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Nav;
