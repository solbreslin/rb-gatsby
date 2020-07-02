import React from "react";
import { Link } from "gatsby";
import Masonry from "react-masonry-css";

const BASE_URL =
  "https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_40,w_400,c_thumb,g_face/";

const ANIMATION_TIME_IN_MS = 250;

const breakpointColumnsObj = {
  default: 3,
  1200: 3,
  700: 2,
  500: 1,
};

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    const { prefilter } = this.props;

    this.state = {
      animatingOut: false,
      filter: prefilter ? prefilter : "all",
      layout: "grid",
    };
  }

  filterImages(newFilter) {
    this.setState({
      animatingOut: true,
      filter: newFilter,
    });

    setTimeout(() => {
      this.setState({
        animatingOut: false,
      });
    }, ANIMATION_TIME_IN_MS);
  }

  toggleLayout(newLayout) {
    this.setState({
      animatingOut: true,
      layout: newLayout,
    });

    setTimeout(() => {
      this.setState({
        animatingOut: false,
      });
    }, ANIMATION_TIME_IN_MS);
  }

  render() {
    const { categories, items } = this.props;
    const { filter, layout, animatingOut } = this.state;

    return (
      <section className="gallery">
        <header>
          <ul className="gallery-filters">
            <li key={"filter-" + filter}>
              <button
                className={filter === "all" ? "active" : ""}
                onClick={() => this.filterImages("all")}
              >
                all
              </button>
            </li>
            {categories.map(category => (
              <li key={category}>
                <button
                  className={filter === category ? "active" : ""}
                  onClick={() => this.filterImages(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>

          <div className="gallery-layout-options">
            <button
              className={layout === "grid" ? "active" : ""}
              onClick={() => this.toggleLayout("grid")}
            >
              Grid
            </button>
            <button
              className={layout === "list" ? "active" : ""}
              onClick={() => this.toggleLayout("list")}
            >
              List
            </button>
          </div>
        </header>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={`gallery-grid ${animatingOut ? "animate-out" : ""} ${
            layout === "grid" ? "active" : ""
          }`}
          columnClassName="gallery-grid-col"
        >
          {items
            .filter(item => item.filter === filter || filter === "all")
            .map(item => (
              <Link key={`GalleryGridItem-${item.path}`} to={item.path}>
                <figure>
                  <img
                    alt={item.project}
                    src={BASE_URL + item.imageURLs[0]}
                  ></img>
                  <figcaption>{item.name}</figcaption>
                </figure>
              </Link>
            ))}
        </Masonry>

        <article
          className={`gallery-list ${layout === "list" ? "active" : ""}`}
        >
          {items
            .filter(item => item.filter === filter || filter === "all")
            .map(item => (
              <div key={`GalleryListItem-${item.path}`}>
                <h3>{item.name}</h3>
                <div className="images">
                  {item.imageURLs.map((url, i) => (
                    <Link to={item.path} key={item.path + "-" + i}>
                      <img alt={item.project} src={BASE_URL + url}></img>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
        </article>
      </section>
    );
  }
}

export default Gallery;
