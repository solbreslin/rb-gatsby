import React from "react";
import { Link } from "gatsby";

const BASE_URL =
  "https://res.cloudinary.com/r-breslin/image/upload/f_auto,q_40,w_300,h_300,c_thumb,g_face/";

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animatingOut: false,
      filter: "all",
    };
  }

  filterImages(newFilter) {
    this.setState({
      animatingOut: true,
      filter: newFilter
    });

    setTimeout(() => {
      this.setState({
        animatingOut: false
      }, );
    }, 250)
  }

  render() {
    const { categories, items } = this.props;
    const { filter, animatingOut } = this.state;

    return (
      <div className="gallery">
        <div className="gallery-filters">
          <ul className="filters">
            <li className={filter === 'all' ? "active" : ""}>
              <button onClick={() => this.filterImages('all')}>all</button>
            </li>
            {categories.map(category => (
              <li className={filter === category ? "active" : ""} key={category}>
                <button onClick={() => this.filterImages(category)}>
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <ul className={`gallery-items ${animatingOut ? 'animate-out' : ''}`}>
          {items.map(item => (
            <li
              key={`GalleryItem-${item.path}`}
              className={filter === item.filter || filter === 'all' ? "active" : ""}
            >
              <Link to={item.path}>
                <figure>
                  <img
                    alt={item.project}
                    src={BASE_URL + item.imageURLs[0]}
                  ></img>
                  <figcaption>{item.name}</figcaption>
                </figure>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Gallery;
