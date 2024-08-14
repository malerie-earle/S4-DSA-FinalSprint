import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TreeInput from './pages/TreeInput';

function App() {
  const [tree, setTree] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('nodes'); // or 'json'

  // Fetch tree data
  const fetchTreeData = async (numbers) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8080/api/trees/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ numbers })
      });
      if (!response.ok) throw new Error('Failed to fetch tree data');
      const data = await response.json();
      setTree(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch previous trees
  const fetchPreviousTrees = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8080/api/trees/previous');
      if (!response.ok) throw new Error('Failed to fetch previous trees');
      const data = await response.json();
      setTree(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <TreeInput
              fetchTreeData={fetchTreeData}
              fetchPreviousTrees={fetchPreviousTrees}
              setViewMode={setViewMode}
              tree={tree}
              loading={loading}
              error={error}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
