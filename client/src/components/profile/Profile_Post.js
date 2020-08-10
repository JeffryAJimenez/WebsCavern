import React from "react";

//mutation
import { useQuery } from "@apollo/client";
import { getPostByIdQuery } from "../../queries/post_queries";

//loading
import Spinner from "../layout/Spinner";

const Profile_Post = ({ id }) => {
  const { data: post, loading, error } = useQuery(getPostByIdQuery, {
    variables: { id },
  });

  if (loading) {
    return (
      <div className='profile_post'>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className='profile_post'>Post Not Found</div>;
  }

  return (
    <div className='profile_post' id={post.id}>
      <h5>Image</h5>
      <img src={post.post.url}></img>
    </div>
  );
};

export default Profile_Post;
