import React from "react";

//mutation
import { useQuery } from "@apollo/client";
import { getCollectionById } from "../../queries/collection_queries";

//loading
import Spinner from "../layout/Spinner";

const Profile_Coll = ({ id }) => {
  const { data: collection, loading, error } = useQuery(getCollectionById, {
    variables: { id },
    onCompleted(E) {
      console.log(E);
    },
  });

  if (loading) {
    return (
      <div className='collection'>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className='collection'>Collection Not Found</div>;
  }

  return collection ? (
    <div className='collection' key={collection.getACollection.id}>
      <h5>Collection</h5>
      <div className='clr'></div>
      {collection.getACollection.banner.map((url) => {
        return <img src={url} />;
      })}

      <p>{`Posts: ${collection.getACollection.size}`}</p>
    </div>
  ) : null;
};

export default Profile_Coll;
