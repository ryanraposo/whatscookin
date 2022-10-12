import { Link } from "react-router-dom";
import Auth from '../../utils/auth';
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { DELETE_POST } from "../../utils/mutations";

import Button from 'react-bootstrap/Button';


const PostList = ({ posts, user }) => {
  const [deletePost, { error }] = useMutation(DELETE_POST);
  const { loading, data } = useQuery(QUERY_ME);
  const { username } = data?.me;

  if (!posts) {
    return <h3>No Posts Yet</h3>;
  }

  return (
    <div className="mt-3">
      {user && (<h3 style={{fontSize: 30}}><span style={{fontStyle: "italic", fontWeight: "bold"}}>{user}</span>'s posts here...</h3>)}
      {posts &&
        posts.slice(0).reverse().map((post) => (
          <div key={post._id} className="card mb-3">
            <div className="card-header">
              <Link to={`/post/${post._id}`} className="card-link">
                <h5 style={{fontFamily: 'Paytone One, sans-serif'}}>{post.postTitle}</h5>
              </Link>
              <p>
                {post.createdAt} (
                <Link
                  className="card-link card-link-heavy"
                  to={`/profile/${post.username}`}
                >
                  {post.username}
                </Link>
                )
              </p>
            </div>
            <div className="card-body">
              {<div dangerouslySetInnerHTML={{ __html: post.postBody }} />}
              {Auth.loggedIn() && (
                <>
                  <hr/>
                  <Link className="card-link" to={`/post/${post._id}`}>
                    <Button variant="primary">Add Comment</Button>
                  </Link>
                </>
              )}
              {username === post.username && (
                <Button variant="danger" onClick={() => deletePost(post._id)}>Delete</Button>
              )} 
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;
