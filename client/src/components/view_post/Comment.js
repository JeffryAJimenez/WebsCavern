import React, { Fragment } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import Moment from "react-moment";
import { Image } from "cloudinary-react";

//queries
import { getPostByIdQuery_comments } from "../../queries/post_queries";

const Comment = ({ comment, postId }) => {
  const { data, loading } = useQuery(gql`
    query {
      currentUser {
        id
      }
    }
  `);

  const [
    deleteComment,
    { loading: loading_delete, data: data_delete },
  ] = useMutation(
    gql`
      mutation($comment_id: ID!, $post_id: ID!) {
        deleteComment(comment_id: $comment_id, post_id: $post_id) {
          id
        }
      }
    `,
    {
      refetchQueries: [
        { query: getPostByIdQuery_comments, variables: { id: postId } },
      ],
    }
  );

  const onDelete = async () => {
    try {
      await deleteComment({
        variables: { comment_id: comment.id, post_id: postId },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <div className='comment'>
        <Image publicId={comment.avatar} cloudName='weebcavern-test'></Image>
        <h5>{comment.username}</h5>
        {!loading && data && data.currentUser.id === comment.user && (
          <button className='deleteButton' onClick={() => onDelete()}>
            x
          </button>
        )}
        <h6>
          <Moment format='MM/DD/YYYY'>{comment.date}</Moment>
        </h6>

        <div className='clr'></div>
        <p>{comment.text}</p>
      </div>
    </Fragment>
  );
};

export default Comment;
