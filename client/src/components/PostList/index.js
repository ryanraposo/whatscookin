import { Link } from "react-router-dom";
import Auth from '../../utils/auth';

import Button from 'react-bootstrap/Button';


const PostList = ({ posts, title }) => {
  if (!posts) {
    return <h3>No Posts Yet</h3>;
  }

  return (
    <div className="mt-3">
      {title && (<h3>{title}</h3>)}
      {posts &&
        posts.slice(0).reverse().map((post) => (
          <div key={post._id} className="card mb-3">
            <div className="card-header">
              <Link to={`/post/${post._id}`} className="card-link">
                <h5>{post.postTitle}</h5>
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
              <hr/>
              {Auth.loggedIn() && (
                <Link className="card-link" to={`/post/${post._id}`}>
                  <Button variant="primary">Add Comment</Button>
                </Link>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;
