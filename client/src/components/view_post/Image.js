import React from "react";
import { Image } from "cloudinary-react";

const ImageView = ({ post }) => {
  console.log(post);
  return (
    <div className='image_view'>
      <h3>{post.post.tittle}</h3>
      <Image publicId={post.post.url} cloudName='weebcavern-test' />

      <div className='clr'></div>

      <ul className='img_left'>
        <li>{`User: ${post.post.user.username}`}</li>
        <li>{`Author:  ${post.post.author}`}</li>
      </ul>

      <ul className='img_right'>
        <li> {`06/04/2020`}</li>
        <li>{`likes: 700`}</li>
      </ul>
    </div>
  );
};

export default ImageView;
