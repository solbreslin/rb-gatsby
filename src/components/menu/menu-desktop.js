import React from "react";
import { Link } from "gatsby";
import Tags from "./tags";
import Nav from "./nav";
import styled from "styled-components";

const MenuDesktop = ({ siteTitle, siteSubtitle, items, tags }) => {
  return (
    <NavEl>
      <Tags tags={tags} />
      <Nav items={items} />
    </NavEl>
  );
};

export default MenuDesktop;

const NavEl = styled.nav`
  display: flex;

  ul {
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;

    a {
      color: hsl(0, 0%, 0%);
      letter-spacing: 0.075em;
      opacity: 0.6;
      padding: 0.5em 1rem;
      text-decoration: none;
      text-transform: uppercase;

      &.active {
        font-family: "Akkurat-Bold";
        opacity: 1;
      }

      &:hover {
        opacity: 1;
      }
    }

    + ul {
      display: inline-flex;
      margin-left: auto;
    }
  }
`;
