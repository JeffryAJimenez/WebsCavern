import React, { Fragment } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { getPostByIdQuery_comments } from "../../queries/post_queries";

//components
import Sidebar from "../layout/Sidebar";
import Comment from "./Comment";
import Image from "./Image";
import CommentForm from "./CommentForm";
import Spinner from "../layout/Spinner";

const ViewPost = () => {
  const { id } = useParams();

  const { data: post, loading, error } = useQuery(getPostByIdQuery_comments, {
    variables: { id },
  });

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    console.log(error);
  }

  return post ? (
    <Fragment>
      <Sidebar />
      <div className='showcase_image_view'>
        <Image post={post} />
        <div className='comments_display'>
          {post.post.comments.length > 0 ? (
            post.post.comments.map((comment) => {
              return <Comment comment={comment} postId={id} />;
            })
          ) : (
            <p style={{ color: "#000" }}>Be the first to comment!</p>
          )}
        </div>
        <div className='clr_flex'></div>
        <CommentForm postID={id} />
      </div>

      <div className='clr'></div>
    </Fragment>
  ) : null;
};

export default ViewPost;
