import fetch from "isomorphic-fetch";
import React from "react";
import Error from "next/error";

import StoryList from "../components/StoryList";
import Layout from "../components/Layout";

class Index extends React.Component {
  static async getInitialProps() {
    let stories;
    try {
      const response = await fetch(
        "https://node-hnapi.herokuapp.com/news?page=1"
      );
      stories = await response.json();
    } catch (error) {
      console.log(error);
      stories = [];
    }

    return { stories };
  }

  render() {
    const { stories } = this.props;

    if (stories.length === 0) {
      return <Error statusCode={503}></Error>;
    }

    return (
      <Layout title="Hacker Next" description="A Hacker News clone made with Next.JS">
        <StoryList stories={stories} />
      </Layout>
    );
  }
}

export default Index;
