import React from "react";
import { Link } from "gatsby";
import Masonry from "react-masonry-css";

const BASE_URL =
  "https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_40,w_400,c_thumb,g_face/";

const ANIMATION_TIME_IN_MS = 250;

const breakpointColumnsObj = {
  default: 3,
  1200: 3,
  768: 1,
};

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animatingOut: false,
      layout: "grid",
    };
  }

  componentDidMount() {
    this.getLayoutSetting();
  }

  getLayoutSetting() {
    if (typeof window === "undefined") return;
    if (!window.localStorage) return;

    const savedLayout = localStorage.getItem("galleryLayout");

    if (savedLayout) {
      this.setState({
        layout: savedLayout,
      });
    }
  }

  toggleLayout(newLayout) {
    localStorage.setItem("galleryLayout", newLayout);

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
    const { items } = this.props;
    const { layout, animatingOut } = this.state;
    return (
      <div className="gallery">
        <header>
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
          {items.map(item => {
            const { path, project, images } = item;

            // Need to construct link string with "/"
            // https://github.com/gatsbyjs/gatsby/issues/11243
            const link = `/${path}`;

            return (
              <Link className="card" key={`GalleryGridItem-${path}`} to={link}>
                <figure>
                  <img alt={project} src={BASE_URL + images[0]}></img>
                  <figcaption>{item.title}</figcaption>
                </figure>
              </Link>
            );
          })}
        </Masonry>

        <article
          className={`gallery-list ${layout === "list" ? "active" : ""}`}
        >
          {items.map(item => {
            const link = `/${item.path}`;

            return (
              <div key={`GalleryListItem-${item.path}`}>
                <h3>
                  <Link to={link}>{item.title}</Link>
                </h3>
                <div className="images">
                  {item.images.map((url, i) => (
                    <Link to={link} key={item.path + "-" + i}>
                      <img alt={item.project} src={BASE_URL + url}></img>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </article>
      </div>
    );
  }
}

export default Gallery;
