import React, { useState } from "react";
import Modal from "../../Modals/Modal";

const Sidebar = ({ tags }) => {
  const [isShowing, setIsShowing] = useState(false);

  const hide = () => {
    setIsShowing(false);
  };

  return (
    <div id='sidebar'>
      <Modal isShowing={isShowing} hide={hide} />
      <button
        className='button_sidebar create_post'
        onClick={() => setIsShowing(true)}
      >
        Create Post
      </button>
      <h3>tags</h3>
      <ul>
        <li>
          <a>loli</a>
        </li>
        <li>
          <a>ugly bastard</a>
        </li>
        <li>
          <a>futanari</a>
        </li>
        <li>
          <a>rough</a>
        </li>
        <li>
          <a>netorare</a>
        </li>
        <li>
          <a>anal</a>
        </li>
        <li>
          <a>big dick</a>
        </li>
        <li>
          <a>etc</a>
        </li>
        <li>
          <a>loli</a>
        </li>
        <li>
          <a>ugly bastard</a>
        </li>
        <li>
          <a>futanari</a>
        </li>
        <li>
          <a>rough</a>
        </li>
        <li>
          <a>netorare</a>
        </li>
        <li>
          <a>anal</a>
        </li>
        <li>
          <a>big dick</a>
        </li>
        <li>
          <a>etc</a>
        </li>
        <li>
          <a>loli</a>
        </li>
        <li>
          <a>ugly bastard</a>
        </li>
        <li>
          <a>futanari</a>
        </li>
        <li>
          <a>rough</a>
        </li>
        <li>
          <a>netorare</a>
        </li>
        <li>
          <a>anal</a>
        </li>
        <li>
          <a>big dick</a>
        </li>
        <li>
          <a>etc</a>
        </li>
        <li>
          <a>loli</a>
        </li>
        <li>
          <a>ugly bastard</a>
        </li>
        <li>
          <a>futanari</a>
        </li>
        <li>
          <a>rough</a>
        </li>
        <li>
          <a>netorare</a>
        </li>
        <li>
          <a>anal</a>
        </li>
        <li>
          <a>big dick</a>
        </li>
        <li>
          <a>etc</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
