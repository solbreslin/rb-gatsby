import React from "react";
import { get, throttle } from "lodash";
import styled from "styled-components";

const HeroContainer = styled.div`
  height: 100vh;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const HeroItem = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  opacity: 0;
`;

const HeroImage = styled.img`
  height: 100%;
  object-fit: contain;
  width: 100%;
`;

const Overlay = styled.div`
  background-image: linear-gradient(to bottom, transparent 30%, #515951);
  bottom: 0;
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
`;

const TextContainer = styled.div`
  bottom: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  margin: auto;
  max-width: 1200px;
  position: absolute;
  right: 0;
  z-index: 2;
`;

const Title = styled.h1`
  color: white;
  font-size: 6rem;
`;

const Subtitle = styled.h3`
  color: white;
  font-size: 4rem;
`;

const THROTTLE_TIME = 120;

class Hero extends React.Component {
  constructor(props) {
    super(props);

    this.imageTotal = this.props.heroImages.length;

    this.zones = [];
    this.state = {
      activeZone: 1,
    };
    this.setZones();

    this.throttledMouseMove = throttle(
      this.throttledMouseMove.bind(this),
      THROTTLE_TIME
    );
  }

  setZones = () => {
    const ww = window.innerWidth;
    const segW = ww / this.imageTotal;

    for (let i = 0; i < this.imageTotal; i++) {
      this.zones.push({
        start: i * segW,
        finish: (i + 1) * segW,
      });
    }
  };

  generatePaths = () => {
    const baseURL = `https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_auto/`;
    const paths = [];

    const edges = this.props.heroImages;
    if (edges) {
      edges.forEach(edge => {
        const id = get(edge, "node.public_id", null);

        if (id) {
          const path = baseURL + id + ".jpg";
          paths.push(path);
        }
      });
    }

    this.imageTotal = paths.length;

    return paths;
  };

  throttledMouseMove = e => {
    this.zones.forEach((zone, index) => {
      if (e.pageX > zone.start && e.pageX < zone.finish) {
        this.setState({ activeZone: index });
      }
    });
  };

  onMouseMove = e => {
    e.persist();
    this.throttledMouseMove(e);
  };

  render = () => {
    const images = this.generatePaths().map((path, index) => {
      return (
        <HeroItem
          key={path}
          style={{ opacity: this.state.activeZone === index ? 1 : 0 }}
        >
          <HeroImage alt="" src={path} />
        </HeroItem>
      );
    });
    return (
      <HeroContainer onMouseMove={this.onMouseMove}>
        {images}
        <TextContainer>
          <Title>Rory Breslin</Title>
          <Subtitle>Artist | Sculptor</Subtitle>
        </TextContainer>
        <Overlay></Overlay>
      </HeroContainer>
    );
  };
}

export default Hero;
