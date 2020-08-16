import React from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { Redirect } from "react-router-dom";

//queries
import { IsUserLoggedInQuery } from "../../queries/client_quieres";
import { getLoggedInUseQuery } from "../../queries/user_queries";

//components
import Form from "./create-post-form";
import Spinner from "../../components/layout/Spinner";

const CreatePostModal = ({ hide }) => {
  const [getUser, currentUser] = useLazyQuery(getLoggedInUseQuery);
  const { data, loading } = useQuery(IsUserLoggedInQuery, {
    onCompleted({ isLoggedIn }) {
      if (isLoggedIn) {
        getUser();
      }
    },
    pollInterval: 1000,
  });

  if (loading) {
    return <Spinner />;
  }

  return data.isLoggedIn && !loading ? (
    <div className='modal'>
      <div className='modal-content'>
        <Form hide={hide} />
      </div>
    </div>
  ) : (
    <Redirect to='/Login' />
  );
};

export default CreatePostModal;
