import { Link } from "gatsby";
import React from "react";
import styled, { css } from "styled-components";

const BASE_URL = `https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_auto/r-breslin-cloudinary/`;

class WorkPreview extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render = () => {
    return (
      <Container>
        {this.props.data.map((data, index) => {
          return (
            <Category key={`${data.path}-${index}`}>
              <Header>
                <Name>{data.display_name}</Name>
                <Linky>
                  <Link to={"/"}>See all</Link>
                </Linky>
              </Header>
              <Images>
                {data.images.map((image, index) => {
                  return (
                    <Link to={"/"}>
                      <Figure key={`${image.path}-${index}`}>
                        <Image
                          alt="todo"
                          src={BASE_URL + image.primary_image}
                        />
                      </Figure>
                    </Link>
                  );
                })}
              </Images>
            </Category>
          );
        })}
      </Container>
    );
  };
}

export default WorkPreview;

const Container = styled.section`
  padding: 2rem 3rem;
`;

const Category = styled.div`
  margin-bottom: 12rem;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
`;

const Name = styled.h3`
  font-size: 2rem;
  margin-right: auto;
`;

const Linky = styled.span`
  color: inherit;
  font-size: 2rem;

  a {
    color: inherit;
    opacity: 0.5;
    text-decoration: none;

    &:hover {
      border-bottom: 2px solid;
      opacity: 1;
    }
  }
`;

const COLS = 2;
const COL_GAP = `10vw`;
const ROW_GAP = `10vw`;
const ColWidth = {
  MAX: `400px`,
  MIN: `250px`,
};

const Images = styled.div`
  display: grid;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fit, minmax(${ColWidth.MIN}, 1fr));
  max-width: calc(${ColWidth.MAX} * ${COLS} + ${COL_GAP});
  grid-gap: ${ROW_GAP} ${COL_GAP};
  align-items: center;
`;

const Image = styled.img`
  display: block;
  height: 100%;
  object-fit: cover;
  transition: transform 1.25s ease-in;
  width: 100%;
`;

const Figure = styled.figure`
  height: auto;
  overflow: hidden;

  &:hover ${Image} {
    transform: scale(1.035);
  }
`;
