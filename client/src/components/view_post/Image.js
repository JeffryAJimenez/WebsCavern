import React, { useState } from "react";
import { Image } from "cloudinary-react";
import { useHistory } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";

const ImageView = ({ post }) => {
  const history = useHistory();

  const [like, setLike] = useState(false);

  const { data, loading } = useQuery(gql`
    query {
      currentUser {
        id
      }
    }
  `);

  const { data: didUserLike } = useQuery(
    gql`
      query($post_id: ID!) {
        didUserLike(post_id: $post_id)
      }
    `,
    {
      variables: { post_id: post.post.id },
      onCompleted(e) {
        if (e.didUserLike) {
          setLike(true);
        }
      },
    }
  );

  const [deletePost] = useMutation(
    gql`
      mutation($id: ID!) {
        deletePost(id: $id) {
          id
        }
      }
    `,
    {
      onCompleted() {
        history.push("/posts");
      },
    }
  );

  const [likePost] = useMutation(
    gql`
      mutation($post_id: ID!) {
        like(post_id: $post_id) {
          user
        }
      }
    `,
    {
      onCompleted() {
        setLike(true);
      },
    }
  );

  const onLike = async () => {
    try {
      await likePost({ variables: { post_id: post.post.id } });
    } catch (err) {
      console.log(err);
    }
  };

  const onDelete = async () => {
    try {
      await deletePost({ variables: { id: post.post.id } });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='image_view'>
      <div class='image_header'>
        <h3>{post.post.tittle}</h3>
        {!loading && data && data.currentUser.id === post.post.user.id && (
          <button class='button delete-post-button' onClick={() => onDelete()}>
            Delete Post
          </button>
        )}
      </div>
      <Image publicId={post.post.url} cloudName='weebcavern-test' />

      <div className='clr'></div>

      <ul className='img_left'>
        <li>{`User: ${post.post.user.username}`}</li>
        <li>{`Author:  ${post.post.author}`}</li>
      </ul>

      <ul className='img_right'>
        <li> {`06/04/2020`}</li>
        <li>
          <i
            onClick={() => onLike()}
            className={!like ? "like_icon" : "like_icon like_icon_liked"}
          ></i>{" "}
          {post.post.likes.length}
        </li>
      </ul>
    </div>
  );
};

export default ImageView;
