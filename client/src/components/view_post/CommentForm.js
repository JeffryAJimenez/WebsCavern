import React, { Fragment, useState } from "react";
import { useMutation } from "@apollo/client";

//component
import Spinner from "../layout/Spinner";

//queries
import { createCommentMutation } from "../../queries/comment_queries";
import { getPostByIdQuery_comments } from "../../queries/post_queries";

const CommentForm = ({ postID }) => {
  const [text, setText] = useState("");
  const [createComment, { loading, error }] = useMutation(
    createCommentMutation,
    {
      onCompleted() {
        setText("");
      },

      refetchQueries: [
        { query: getPostByIdQuery_comments, variables: { id: postID } },
      ],
    }
  );

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await createComment({ variables: { postId: postID, input: text } });
    } catch (err) {
      console.log('error:', err);
    }
  };

  return (
    <div className='create_comment'>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {error ? <div class="error-notice">{error.message}</div> : <div></div>}
          <div className='bg-primary p'>
            <h3>Leave a Comment</h3>
          </div>
          <form onSubmit={(e) => onSubmit(e)}>
            <textarea
              name='comment'
              placeholder='Create a post'
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            ></textarea>
            <button type='submit' className='button button-submit'>
              Submit
            </button>
          </form>
        </Fragment>
      )}
    </div>
  );
};

export default CommentForm;
