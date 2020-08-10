import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";

//Queries && Mutations
import { useQuery, useLazyQuery } from "@apollo/client";
import { getUserByIdQuery } from "../../queries/user_queries";
import { getProfileQuery } from "../../queries/profile_queries";

//spinner && alerts
import Spinner from "../layout/Spinner";
import Alert from "../layout/Alert";

//components
import Profile_Post from "./Profile_Post";
import Profile_col from "./Profile_coll";
import Sidebar from "../layout/Sidebar";

const Profile = () => {
  const [togglePosts, setTogglePosts] = useState(true);

  const { id } = useParams();
  const [
    getProfile,
    { data: profile, loading: profile_loading, error: profile_error },
  ] = useLazyQuery(getProfileQuery);

  const { data: user, loading: user_loading, error: user_error } = useQuery(
    getUserByIdQuery,
    {
      variables: { id },
      onCompleted({ user }) {
        getProfile({ variables: { id: user.profile } });
      },
    }
  );

  if (user_loading || profile_loading) {
    return <Spinner />;
  }

  if (user_error) {
    return <Alert payload={user_error.message} type={"danger"} />;
  }
  if (profile_error) {
    return <Alert payload={profile_error.message} type={"danger"} />;
  }

  return (
    <Fragment>
      <Sidebar />{" "}
      {user && profile ? (
        <div className='profile'>
          <div className='profile_header'>
            <img
              src={require("../../images/pfpAyuwoki.jpg")}
              alt='OwO PFP not Found!'
            ></img>
            <h4>{user.user.username}</h4>
            <h6>
              {" "}
              {`posts: ${profile.profile.postSize} | collections: ${profile.profile.collectionsSize}`}
            </h6>
            <h6> member since: 06/04/2020</h6>
          </div>

          <div className='profile_tabs'>
            <ul>
              <li>
                <button
                  onClick={() => setTogglePosts(true)}
                  className='list_button'
                >
                  Posts
                </button>
              </li>

              <li>
                <button
                  onClick={() => setTogglePosts(false)}
                  className='list_button'
                >
                  Collections
                </button>
              </li>
            </ul>
          </div>

          <div className='profile_showcase'>
            {togglePosts
              ? profile.profile.posts.map((id) => {
                  return <Profile_Post id={id} key={id} />;
                })
              : profile.profile.collections.map((id) => {
                  return <Profile_col id={id} key={id} />;
                })}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Profile;
