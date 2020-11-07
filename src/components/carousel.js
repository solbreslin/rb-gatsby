import React, { useEffect, useCallback, useState } from "react";
import { useEmblaCarousel } from "embla-carousel/react";
import styled, { css } from "styled-components";

const BASE_URL =
  "https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_80/r-breslin-cloudinary/";

const useKeyPress = (targetKeyCode, callback) => {
  function downHandler(e) {
    if (e.which === targetKeyCode) {
      callback();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [targetKeyCode, downHandler]);
};

const NavArrow = () => (
  <span>
    <svg
      aria-hidden="true"
      role="presentation"
      focusable="false"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path>
      </g>
    </svg>
  </span>
);

export default ({ images, index }) => {
  const [EmblaCarouselReact, embla] = useEmblaCarousel({
    loop: false,
    startIndex: index || 0,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const scrollTo = useCallback(index => embla && embla.scrollTo(index), [
    embla,
  ]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
  }, [embla, setScrollSnaps, onSelect]);

  const isDesktop = () => {
    if (typeof window !== "undefined") {
      const { matches } = window.matchMedia("(max-width: 1200px)");
      return matches;
    }
  };

  const onImageClick = (url, i) => {
    if (url) {
      console.log(url, i);
    }
  };

  useKeyPress(37, scrollPrev);
  useKeyPress(39, scrollNext);

  return (
    <>
      <EmblaCarouselReact>
        <CarouselWrapper tabIndex="0">
          {images.map((url, i) => (
            <figure key={url + i}>
              <img
                crossOrigin="anonymous"
                src={BASE_URL + url}
                alt=""
                onClick={() => onImageClick(url, i)}
              />
            </figure>
          ))}
        </CarouselWrapper>
      </EmblaCarouselReact>
      <CarouselNav>
        <button
          className="prev"
          onClick={scrollPrev}
          disabled={!prevBtnEnabled}
        >
          {NavArrow()}
        </button>
        <button
          className="next"
          onClick={scrollNext}
          disabled={!nextBtnEnabled}
        >
          {NavArrow()}
        </button>
      </CarouselNav>
    </>
  );
};

const CarouselWrapper = styled.div`
  background-color: hsl(0, 0%, 0%);
  display: flex;
  height: 100vh;
  position: fixed;
  transform: none !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  > * {
    min-width: 100%;
  }

  figure {
    height: 100%;
    left: 0;
    opacity: 0;
    padding: 2rem;
    pointer-events: none;
    position: absolute;
    top: 0;
    transition: opacity 0.5s;
    width: 100%;

    @include respond-to(desktop) {
      display: flex;
    }

    &.is-selected {
      opacity: 1;
      pointer-events: auto;
    }

    img {
      height: 100%;
      object-fit: contain;
      width: 100%;

      @include respond-to(desktop) {
        margin: auto;
        max-height: 80vh;
      }
    }
  }
`;

const CarouselNav = styled.div`
  display: block; // required for button styles to apply - bug?

  button {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    z-index: 4;

    &[disabled] {
      opacity: 0.4;
      pointer-events: none;
    }

    span {
      align-items: center;
      background: hsla(0, 0, 0, 0.25);
      display: flex;
      justify-content: center;
      border-radius: 50%;
      height: 50px;
      // opacity: 0;
      padding: 0.75rem;
      transition: opacity 0.1s ease, transform 0.2s ease;
      width: 50px;

      &:hover {
        transform: scale(1.1);
      }
    }

    &:hover {
      span {
        opacity: 1;
      }
    }

    svg {
      display: block;
      fill: none;
      height: 30px;
      overflow: visible;
      stroke: white;
      stroke-width: 5px;
      width: 30px;
    }

    &.prev {
      left: 1rem;

      svg {
        transform: translateX(-2px);
      }
    }

    &.next {
      justify-content: flex-end;
      right: 1rem;

      svg {
        transform: rotate(180deg);
      }
    }
  }
`;
