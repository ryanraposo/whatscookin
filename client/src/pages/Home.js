import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';

import PostList from '../components/PostList';


const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);

  const posts = data?.posts || [];
  console.log(posts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className="col-12 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PostList posts={posts} />
          )}
        </div>
      </div>
    </main>
  );
};


export default Home;
