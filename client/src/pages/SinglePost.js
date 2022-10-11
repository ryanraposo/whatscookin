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
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {post.username}
          </span>{' '}
          post on {post.createdAt}
        </p>
        <div className="card-body">
          <p>{post.postBody}</p>
        </div>
      </div>

      {post.commentCount > 0 && <CommentList comments={post.comments} />}
      {Auth.loggedIn() && <CommentForm postId={post._id} />}

    </div>
  );
};

export default SinglePost;