import { Link } from "gatsby";
import React from "react";

class Nav extends React.Component {
  render = () => {
    return (
      <nav className="rb-nav">
        <ul>
          <li>
            <Link to={"/"} activeClassName="active">
              Home
            </Link>
          </li>
          <li>
            <Link to={"/work"} activeClassName="active">
              Work
            </Link>
          </li>
          <li>
            <Link to={"/process"} activeClassName="active">
              Process
            </Link>
          </li>
          <li>
            <Link to={"/contact"} activeClassName="active">
              Contact
            </Link>
          </li>
        </ul>
        <footer>
          <p>Mayo, Ireland</p>
          <a href="mailto:info@rorybreslin.com">info@rorybreslin.com</a>
        </footer>
      </nav>
    );
  };
}

export default Nav;
