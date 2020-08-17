import { gql } from "@apollo/client";

const createCommentMutation = gql`
  mutation($postId: ID!, $input: String!) {
    createComment(postId: $postId, input: $input) {
      id
      user
      username
      text
    }
  }
`;

export { createCommentMutation };
