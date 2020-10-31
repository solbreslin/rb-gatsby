import { Link } from "gatsby";
import React from "react";
import styled, { css } from "styled-components";

const BASE_URL = `https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_auto/r-breslin-cloudinary/`;

const TRANSITION_TIME = 7000;

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
    };
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    setInterval(() => {
      const { length } = this.props.data;
      const { activeIndex } = this.state;

      const reset = activeIndex === length - 1 ? true : false;

      this.setState({
        activeIndex: reset ? 0 : this.state.activeIndex + 1,
      });
    }, TRANSITION_TIME);
  }

  render = () => {
    return (
      <Container>
        <ImagesWrapper>
          {this.props.data.map((d, index) => {
            return (
              <ImageWrapper
                key={index}
                active={this.state.activeIndex === index ? true : false}
              >
                <Image src={BASE_URL + d.carousel_image} alt="" />
              </ImageWrapper>
            );
          })}
        </ImagesWrapper>
        <TextBox>
          <Title>Rory Breslin</Title>
          <Subtitle>Artist | Sculptor</Subtitle>
        </TextBox>
      </Container>
    );
  };
}

export default Carousel;

const Container = styled.div`
  height: 80vh;
  overflow: hidden;
  position: relative;
`;

const ImagesWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  &:after {
    background-image: linear-gradient(
      to top,
      hsla(0, 0%, 0%, 0.5),
      hsla(0, 0%, 0%, 0)
    );
    bottom: 0;
    content: "";
    height: 50%;
    left: 0;
    position: absolute;
    right: 0;
    z-index: 1;
  }
`;

const ImageWrapper = styled.figure`
  bottom: 0;
  left: 0;
  opacity: ${props => (props.active ? 1 : 0)};
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
  transition: opacity 1.5s ease;
`;

const Image = styled.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
`;

const TextBox = styled.div`
  bottom: 0;
  display: flex;
  flex-wrap: wrap;
  left: 0;
  padding: 2rem 3rem;
  position: absolute;
  right: 0;
  z-index: 1;
`;

const text = css`
  color: white;
  font-size: 2rem;
  letter-spacing: 0.05em;
  line-height: 1;
  text-transform: uppercase;
`;

const Title = styled.h1`
  ${text};
  margin-right: auto;
  margin-bottom: 1rem;
  padding-right: 1rem;
`;

const Subtitle = styled.h3`
  ${text};
`;
