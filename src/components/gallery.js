import React from "react";
import { Link } from "gatsby";

const BASE_URL =
  "https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_40,w_400,c_thumb,g_face/r-breslin-cloudinary/";

const ANIMATION_TIME_IN_MS = 250;

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animatingOut: false,
      layout: "grid",
    };

    this.interval = null;
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

  handleMouseEnter = ({ target }) => {
    const figure = target.closest("figure");
    const imageEls = [...figure.querySelectorAll("img")];
    let current = 0;

    if (imageEls && imageEls.length) {
      this.interval = setInterval(() => {
        imageEls[current].classList.remove("active");

        if (current === imageEls.length - 1) {
          current = 0;
        } else {
          current++;
        }

        imageEls[current].classList.add("active");
      }, 2000);
    }
  };

  handleMouseLeave = ({ target }) => {
    clearInterval(this.interval);
    this.interval = null;
    const figure = target.closest("figure");
    const imageEls = [...figure.querySelectorAll("img")];
    if (imageEls && imageEls.length) {
      imageEls.forEach(img => img.classList.remove("active"));
      imageEls[0].classList.add("active");
    }
  };

  render() {
    const { items } = this.props;
    const { layout, animatingOut } = this.state;
    return (
      <div className="gallery">
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

        <div
          className={`gallery-grid ${animatingOut ? "animate-out" : ""} ${
            layout === "grid" ? "active" : ""
          }`}
        >
          {items.map(item => {
            const { images, path, project, primary_image } = item;

            // Need to construct link string with "/"
            // https://github.com/gatsbyjs/gatsby/issues/11243
            const link = `/${path}`;

            return (
              <Link className="card" key={`GalleryGridItem-${path}`} to={link}>
                <figure>
                  <img
                    className="active"
                    alt={project}
                    src={BASE_URL + primary_image}
                  />
                  {images
                    .filter(url => {
                      return url !== primary_image;
                    })
                    .map((url, i) => (
                      <img key={url} alt={project} src={BASE_URL + url} />
                    ))}
                  <figcaption>{item.title}</figcaption>
                </figure>
              </Link>
            );
          })}
        </div>
        <article
          className={`gallery-list ${layout === "list" ? "active" : ""}`}
        >
          {items.map(item => {
            const link = `/${item.path}`;

            return (
              <div key={`GalleryListItem-${item.path}`}>
                <div className="images">
                  {item.images.map((url, i) => (
                    <Link to={link} key={item.path + "-" + i}>
                      <img alt={item.project} src={BASE_URL + url}></img>
                    </Link>
                  ))}
                </div>
                <h3>
                  <Link to={link}>{item.title}</Link>
                </h3>
              </div>
            );
          })}
        </article>
      </div>
    );
  }
}

export default Gallery;
