import { Link } from 'react-router-dom';

const CommentList = ({ comments }) => {
  return (
    <div className="card mb-3">
        <div className="card-header">
            <span className="text-dark" style={{ fontWeight: 600 }} >Comments</span>
        </div>
        <div className="card-body">
            {comments &&
            comments.map(comment => (
                <p className="pill mb-3" key={comment._id}>
                {comment.commentBody} {'// '}
                <Link to={`/profile/${comment.username}`} className="card-link card-link-heavy">
                    {comment.username} on {comment.createdAt}
                </Link>
                </p>
            ))}
        </div>
    </div>
  );
};

export default CommentList;