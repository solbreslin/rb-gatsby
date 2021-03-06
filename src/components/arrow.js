import React from "react";
import styled from "styled-components";

const Arrow = ({ orientation }) => {
  return (
    <ArrowIcon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0"
        y="0"
        viewBox="0 0 14.5 8.18"
        style={orientation === "left" ? { transform: "rotate(-180deg)" } : {}}
      >
        <line
          stroke="#2B2B2B"
          strokeMiterlimit="10"
          x1="0"
          y1="4.09"
          x2="13.42"
          y2="4.09"
        ></line>
        <polygon
          fill="#2B2B2B"
          points="10.1,8.18 9.42,7.45 13.03,4.09 9.42,0.73 10.1,0 14.5,4.09"
        ></polygon>
      </svg>
    </ArrowIcon>
  );
};

export default Arrow;

const ArrowIcon = styled.span`
  align-items: center;
  display: flex;
  margin-right: 8px;
  position: relative;
  width: 18px;

  svg {
    display: block;
    width: 100%;
  }
`;
