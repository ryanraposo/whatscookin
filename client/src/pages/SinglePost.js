import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_POST } from '../utils/queries';
import Auth from '../utils/auth';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';


const SinglePost = props => {
  const { id: postId } = useParams();

  const { loading, data } = useQuery(QUERY_POST, {
    variables: { id: postId }
  });

  const post = data?.post || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div key={post._id} className="card mb-3">
      <div className="card-header">
          <h5>{post.postTitle}</h5>
        <p>
          {post.createdAt} (
          <Link
            to={`/profile/${post.username}`}
            style={{ fontWeight: 700 }}
          >
            {post.username}
          </Link>
          )
        </p>
      </div>
      <div className="card-body">
        {<div dangerouslySetInnerHTML={{ __html: post.postBody }} />}
        {post.commentsCount > 0 && <CommentList comments={post.comments} />}
        {Auth.loggedIn() && <CommentForm postId={post._id} />}
      </div>
    </div>
  );
};

export default SinglePost;