import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';

import PostList from '../components/PostList';
import HeaderImage from '../assets/images/header.jpeg';


const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);

  const posts = data?.posts || [];
  console.log(posts);

  return (
    <main>
      <div
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: `url(${HeaderImage})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", width: "100%", height: 200 }}
      >
        <h2 className="title" style={{color: "white", padding: 20, backgroundColor: "rgba(0, 0, 0, 0.5)"}}>Check Out What's Cookin'</h2>
      </div>
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
