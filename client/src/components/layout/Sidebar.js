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
      <ul></ul>
    </div>
  );
};

export default Sidebar;
