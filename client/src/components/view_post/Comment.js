import React, { Fragment } from "react";
import Moment from "react-moment";
import { Image } from "cloudinary-react";

const Comment = ({ comment }) => {
  return (
    <Fragment>
      <div className='comment'>
        <Image publicId={comment.avatar} cloudName='weebcavern-test'></Image>
        <h5>{comment.username}</h5>
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
