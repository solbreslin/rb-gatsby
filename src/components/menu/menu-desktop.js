import React, { useState } from "react";
import { Link } from "gatsby";
import Tags from "./tags";
import Nav from "./nav";

const MenuDesktop = ({ siteTitle, items, tags }) => {
  const [active, setActive] = useState(true);
  return (
    <aside className={active ? "is-active" : "is-hidden"}>
      <h3>
        <Link to="/">{siteTitle}</Link>
      </h3>
      <nav className="nav-desktop">
        <Tags tags={tags} />
        <Nav items={items} />
      </nav>
      <footer>
        <p>
          <span className="icon">
            <svg
              aria-hidden="true"
              data-prefix="fas"
              data-icon="map-marker-alt"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path
                fill="currentColor"
                d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"
              />
            </svg>
          </span>
          Mayo, Ireland
        </p>
        <a href="mailto:info@rorybreslin.com">
          <span className="icon">
            <svg
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
            >
              <path
                d="M512 64H0v384h512V64zm-48 48v40.805c-22.422 18.259-131.581 91.352-208 151.191-16.841 13.247 23.212.371 0 0-23.208.375 16.834 13.242 0 0-76.407-59.83-185.575-132.929-208-151.191V112h416zM48 400V214.398c22.914 18.251 158.471 125.031 208 163.815 24.354-24.355-24.354-24.354 0 0 49.528-38.783 185.085-145.562 208-163.814V400H48z"
                fillRule="nonzero"
                fill="currentColor"
              />
            </svg>
          </span>
          info@rorybreslin.com
        </a>
      </footer>
    </aside>
  );
};

export default MenuDesktop;
