import React from "react";
import { graphql } from "gatsby";
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
    return this.props.data.site.siteMetadata.menuLinks.map((menuLink, i) => {
      const { link, name, image } = menuLink;

      return (
        <Card key={`${name}-${i}`} link={link} name={name} image={image}></Card>
      );
    });
  }

  getHeroContent() {
    const { data } = this.props;

    return {
      image: data.allHomeJson.edges[0].node.hero.image,
      title: data.allHomeJson.edges[0].node.hero.title,
      subtitle: data.allHomeJson.edges[0].node.hero.subtitle,
      blurb: data.allDatoCmsHero.edges[0].node.heroBlurb,
    };
  }

  render = () => {
    const {
      image: heroImage,
      title: heroTitle,
      subtitle: heroSubtitle,
      blurb: heroBlurb,
    } = this.heroContent;

    return (
      <Layout className="index">
        <SEO title="Home" />

        <Hero
          heroImage={heroImage}
          title={heroTitle}
          subtitle={heroSubtitle}
          blurb={heroBlurb}
        />
        <section>
          <h1>Selected Work</h1>
          <div className="cards">{this.cards}</div>
        </section>
      </Layout>
    );
  };
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        menuLinks {
          name
          link
          image
        }
      }
    }
    allHomeJson {
      edges {
        node {
          hero {
            title
            subtitle
            image
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
