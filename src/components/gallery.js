import React from "react";
import { Link } from "gatsby";
import throttle from "lodash.throttle";

const BASE_URL =
  "https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_auto,w_500,h_500,c_thumb,g_face/r-breslin-cloudinary/";

const PREVIEW_URL =
  "https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_auto,w_500/r-breslin-cloudinary/";

const ANIMATION_TIME_IN_MS = 250;

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animatingOut: false,
      layout: "grid",
      activePreview: null,
    };

    this.throttledMouseMove = throttle(this.throttledMouseMove.bind(this), 0);
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

  handleMouseLeave(e) {
    this.setState({
      activePreview: null,
    });
  }

  throttledMouseMove = e => {
    const { target } = e;

    const li = target.parentNode;
    const index = li.getAttribute("data-index");

    if (this.state.activePreview !== index) {
      this.setState({
        activePreview: index,
      });
    }
  };

  handleMouseMove(e) {
    e.persist();
    this.throttledMouseMove(e);
  }

  render() {
    const { items, title } = this.props;
    const { layout, animatingOut, activePreview } = this.state;

    return (
      <div className="gallery">
        <div className="gallery-header">
          <h1>{title}</h1>
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
        </div>

        <div
          className={`gallery-grid ${animatingOut ? "animate-out" : ""} ${
            layout === "grid" ? "active" : ""
          }`}
        >
          {items.map(item => {
            const { path, project, primary_image } = item;

            // Need to construct link string with "/"
            // https://github.com/gatsbyjs/gatsby/issues/11243
            const link = `/${path}`;

            return (
              <div
                className="gallery-grid-item"
                key={`GalleryGridItem-${path}`}
              >
                <Link to={link}>
                  <figure>
                    <img alt={project} src={BASE_URL + primary_image} />
                    <figcaption className="sr-only">{item.title}</figcaption>
                  </figure>
                  <h4>{item.title}</h4>
                </Link>
              </div>
            );
          })}
        </div>
        <article
          className={`gallery-list ${layout === "list" ? "active" : ""}`}
        >
          <ul
            className="gallery-list-list"
            onMouseMove={this.handleMouseMove.bind(this)}
            onMouseLeave={this.handleMouseLeave.bind(this)}
          >
            {items.map((item, index) => {
              const link = `/${item.path}`;

              return (
                <li
                  className="gallery-list-item"
                  key={`GalleryListItem-${item.path}`}
                  data-index={index}
                >
                  <Link to={link}>{item.title}</Link>
                </li>
              );
            })}
          </ul>
          <div className="gallery-list-preview-image">
            {items.map(({ primary_image }, index) => {
              return (
                <div
                  key={`GalleryListPreviewImage-${index}`}
                  className={
                    index === parseInt(activePreview) ? "is-active" : ""
                  }
                  data-index={index}
                >
                  <img alt="" src={PREVIEW_URL + primary_image} />
                </div>
              );
            })}
          </div>
        </article>
      </div>
    );
  }
}

export default Gallery;
