import React from "react";
import { Link } from "gatsby";
import Tags from "./tags";
import Nav from "./nav";

const MenuMobile = ({ siteTitle, items, tags }) => {
  return (
    <div hidden>
      <Link to="/">{siteTitle}</Link>
      <nav className="nav-mobile">
        <Nav items={items} />
        <Tags tags={tags} />
      </nav>
    </div>
  );
};

export default MenuMobile;
