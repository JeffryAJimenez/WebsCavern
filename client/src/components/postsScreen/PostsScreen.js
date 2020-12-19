import React, { Fragment } from "react";
import Post from "./Post";
import { gql, useQuery } from "@apollo/client";

//components
import Sidebar from "../layout/Sidebar";

const GET_POSTS = gql`
  query($cursor: String, $limit: Int) {
    posts(cursor: $cursor, limit: $limit) {
      postFeed {
        id
        url
      }

      pageInfo {
        nextPageCursor
        hasNextPage
      }
    }
  }
`;
const PostsScreen = () => {
  const { data, error, loading } = useQuery(GET_POSTS);

  return (
    <Fragment>
      <Sidebar />
      <div class='showcase'>
        {data &&
          !loading &&
          !error &&
          data.posts.postFeed.map((post) => {
            return <Post post={post} />;
          })}
      </div>
    </Fragment>
  );
};

export default PostsScreen;
