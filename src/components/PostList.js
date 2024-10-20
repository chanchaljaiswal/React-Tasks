import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, removePost } from "../store/actions/postActions";

const Card = lazy(() => import("./Card"));
const Pagination = lazy(() => import("./Pagination"));

/**
 * PostList component that displays a paginated list of posts.
 * Fetches posts from the store and allows the removal of a post.
 *
 * @returns {JSX.Element} The rendered PostList component.
 */
const PostList = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [displayedPosts, setDisplayedPosts] = useState([]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    if (posts.length) {
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      setDisplayedPosts(posts.slice(indexOfFirstPost, indexOfLastPost));
    }
  }, [posts, currentPage, postsPerPage]);

  const handleRemovePost = (id) => {
    dispatch(removePost(id));
    const updatedPosts = posts.filter((post) => post.id !== id);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    setDisplayedPosts(updatedPosts.slice(indexOfFirstPost, indexOfLastPost));
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <h2 className="text-2xl text-center my-4">Loading...</h2>;
  }

  if (error) {
    return <h2 className="text-2xl text-center my-4 text-red-500">{error}</h2>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Suspense fallback={<h2>Loading posts...</h2>}>
          {displayedPosts.map((post) => (
            <Card key={post.id} post={post} onRemove={handleRemovePost} />
          ))}
        </Suspense>
      </div>
      <Suspense fallback={<h2>Loading pagination...</h2>}>
        <Pagination
          totalPosts={posts.length}
          postsPerPage={postsPerPage}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Suspense>
    </div>
  );
};

export default PostList;
