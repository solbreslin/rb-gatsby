import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

class WorkPage extends React.Component {
  render = () => {
    return (
      <Layout>
        <SEO title="Work" />
        <div>Sol says hi</div>
      </Layout>
    );
  };
}

export default WorkPage;
