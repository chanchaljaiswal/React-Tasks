import React, { useState } from 'react';

/**
 * Card component that displays a post with a title, body, and image.
 * Allows removing a post by invoking the onRemove function.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.post - The post object containing title, body, and image.
 * @param {string} props.post.title - The title of the post.
 * @param {string} props.post.body - The body content of the post.
 * @param {string} props.post.image - The image URL for the post.
 * @param {Function} props.onRemove - Function to call when the post is removed.
 * @param {string} props.post.id - The unique ID of the post.
 *
 * @returns {JSX.Element} The rendered card component.
 */

const Card = ({ post, onRemove }) => {
  const [loading, setLoading] = useState(true); // To track image loading state

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 relative">
      <button
        className="text-red-500 font-bold absolute top-3 right-3 "
        onClick={() => onRemove(post.id)}
      >
        X
      </button>
      <h3 className="text-xl font-bold mb-2 mt-10 truncate">{post.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{post.body}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Mon, 21 Dec 2020 14:57 GMT</span>
      </div>
       <div className="w-full h-32 mt-4 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
          </div>
        )}
        <img
          src={post.image}
          alt={post.title}
          className={`w-full h-32 object-cover rounded-lg transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
};

export default Card;
