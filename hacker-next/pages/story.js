import React from "react";
import Error from "next/error";
import Link from "next/link";
import fetch from "isomorphic-fetch";

import CommentList from "../components/CommentList";
import Layout from "../components/Layout";

class Story extends React.Component {
  static async getInitialProps({ req, res, query }) {
    let story;
    let story_id = query.id;

    try {
      const response = await fetch(
        `https://node-hnapi.herokuapp.com/item/${story_id}`
      );
      story = await response.json();
    } catch (error) {
      console.log(error);
      stories = null;
    }

    return { story };
  }

  render() {
    const { story } = this.props;

    if (!story) {
      return <Error statusCode={503}></Error>;
    }

    return (
      <Layout title={story.title} backButton={true}>
        <main>
          <h1 className="story-title">
            <a href={story.url}>{story.title}</a>
          </h1>
          <div className="story-details">
            <strong>{story.points} points</strong>
            <strong>{story.comments_count} comments</strong>
            <strong>{story.time_ago}</strong>
          </div>

          {story.comments.length > 0 ? (
            <CommentList comments={story.comments}></CommentList>
          ) : (
            <div>No comments for this story.</div>
          )}
        </main>

        <style jsx>{`
          main {
            padding: 1em;
          }
          .story-title {
            font-size: 1.2rem;
            margin: 0;
            font-weight: 300;
            padding-bottom: 0.5em;
          }
          .story-title a {
            color: #333;
            font-decoration: none;
          }
          .story-title a:hover {
            text-decoration: underline;
          }
          .story-details {
            font-size: 0.8rem;
            padding-bottom: 1em;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            margin-bottom: 1em;
          }
          .story-details strong {
            margin-right: 1em;
          }
          .story-details a {
            color: #f60;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Story;
