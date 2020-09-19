import React from "react";
import { Link } from "gatsby";

const Tags = ({ tags }) => {
  return (
    <ul className="nav-tags">
      {tags.map((tag, i) => {
        return (
          <li key={`${tag}-${i}`}>
            <Link to={"/" + tag.node.path} activeClassName="active">
              {tag.node.display_name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Tags;
