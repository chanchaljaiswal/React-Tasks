import React, { Suspense } from 'react';
import './App.css';

const PostList = React.lazy(() => import('./components/PostList'));

function App() {
  return (
    <div className="App bg-customBg">
      <Suspense fallback={<div>Loading Posts...</div>}>
        <PostList />
      </Suspense>
    </div>
  );
}

export default App;

