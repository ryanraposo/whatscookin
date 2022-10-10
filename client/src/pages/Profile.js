import { Navigate, useParams } from "react-router-dom";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import PostList from "../components/PostList";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";

const Profile = () => {
  const { username: userParam } = useParams();


  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }
  return (
    <div>
      <div className="content">
        <div className="col-12 mb-3 col-lg-8">
          <PostList
            posts={user.posts}
            title={`${user.username}'s posts...`}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
