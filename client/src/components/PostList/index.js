import { Link } from 'react-router-dom';


const PostList = ({ posts, title }) => {
    if (!posts.length) {
      return <h3>No Posts Yet</h3>;
    }
    
    return (
      <div>
        <h3>{title}</h3>
        {posts &&
          posts.map(post => (
            <div key={post._id} className="card mb-3">
              <div className="card-header">
                <Link to={`/post/${post._id}`}>
                  <h5>{post.postTitle}</h5>
                 </Link>
                <p>{post.createdAt} (<Link
                  to={`/profile/${post.username}`}
                  style={{ fontWeight: 700 }}
                >
                  {post.username}
                </Link>)</p>
              </div>
              <div className="card-body">
                
                { <div dangerouslySetInnerHTML={{ __html: post.postBody }} /> }
              </div>
            </div>
          ))}
      </div>
    );
  };
  
export default PostList;