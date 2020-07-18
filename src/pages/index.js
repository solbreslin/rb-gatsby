import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import Hero from "../components/hero";
import Card from "../components/card";
import SEO from "../components/seo";

class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.cards = this.buildCards();
    this.heroContent = this.getHeroContent();
  }

  componentDidMount() {
    if (window) {
      window.addEventListener("scroll", this.onScroll);
    }
    document.body.classList.add("index");
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener("scroll", this.onScroll);
      document.documentElement.style.setProperty("--scroll-y", 0);
    }
    document.body.classList.remove("index");
  }

  onScroll(e) {
    const top = window.pageYOffset || document.documentElement.scrollTop;

    if (top <= window.innerHeight) {
      document.documentElement.style.setProperty("--scroll-y", top);
    }
  }

  buildCards() {
    const { data } = this.props;
    const cardImages = this.getCardImages();

    return data.site.siteMetadata.menuLinks.map((menuLink, index) => {
      const { link, name } = menuLink;
      let imagePath = "";

      cardImages.forEach(path => {
        if (path.includes(name)) {
          imagePath = path;
        }
      });

      return (
        <Card
          key={name + "-" + index}
          link={link}
          name={name}
          image={imagePath}
        ></Card>
      );
    });
  }

  getCardImages() {
    const { data } = this.props;

    return data.allCloudinaryMedia.edges
      .filter(item => item.node.public_id.includes("Boxes"))
      .map(item => item.node.public_id);
  }

  getHeroContent() {
    const { data } = this.props;
    return {
      images: data.allCloudinaryMedia.edges,
      title: data.allHomeJson.edges[0].node.hero.title,
      subtitle: data.allHomeJson.edges[0].node.hero.subtitle,
      blurb: data.allDatoCmsHero.edges[0].node.heroBlurb,
    };
  }

  render = () => {
    const {
      images: heroImages,
      title: heroTitle,
      subtitle: heroSubtitle,
      blurb: heroBlurb,
    } = this.heroContent;

    return (
      <Layout className="index">
        <SEO title="Home" />

        <Hero
          heroImages={heroImages}
          title={heroTitle}
          subtitle={heroSubtitle}
          blurb={heroBlurb}
        />

        <section className="cards" id="cards">
          <h1>Selected Work</h1>
          {this.cards}
        </section>
      </Layout>
    );
  };
}

export const pageQuery = graphql`
  query {
    allCloudinaryMedia(filter: { public_id: { regex: "/HOMEPAGE/" } }) {
      edges {
        node {
          public_id
        }
      }
    }
    site {
      siteMetadata {
        title
        menuLinks {
          name
          link
        }
      }
    }
    allHomeJson {
      edges {
        node {
          hero {
            title
            subtitle
          }
        }
      }
    }
    allDatoCmsHero {
      edges {
        node {
          heroBlurb
        }
      }
    }
  }
`;

export default IndexPage;
