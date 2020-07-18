import React from "react";
import { Link } from "gatsby";

const BASE_URL =
  "https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_40,w_500,c_thumb,g_face/";

export default ({ name, link, image }) => {
  return (
    <Link to={link} className="card">
      <figure>
        <img src={BASE_URL + image} alt="" />
        <figcaption>{name}</figcaption>
      </figure>
    </Link>
  );
};
