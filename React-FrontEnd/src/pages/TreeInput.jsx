import React, { useState } from 'react';
import TreeViewer from '../components/TreeViewer';

const TreeInput = () => {
  const [numbers, setNumbers] = useState('');
  const [numberList, setNumberList] = useState([]);
  const [tree, setTree] = useState(null);
  const [previousTrees, setPreviousTrees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNumbers(value);

    // Convert the input string to an array of numbers
    const numArray = value.split(',')
      .map(num => num.trim())
      .filter(num => !isNaN(num) && num !== '');

    setNumberList(numArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the format: comma-separated numbers
    const isValidFormat = /^[0-9]+(?:\s*,\s*[0-9]+)*$/.test(numbers.trim());

    if (!isValidFormat) {
      setError('Please enter a valid comma-separated list of numbers.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/trees/process', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: numbers
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTree(data); // Assuming data is in the format { value, left, right }
      setNumbers('');
      setNumberList([]);
    } catch (error) {
      setError(`Failed to process numbers: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleShowPrevious = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:8080/api/trees/previous');

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setPreviousTrees(data); // Assuming data is an array of tree objects
      } else {
        setError('Unexpected response format for previous trees.');
      }
    } catch (error) {
      setError(`Failed to fetch previous trees: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
<h1>Binary Search Tree Creator</h1>
      <div className="mainDiv">
        <h1>Enter Numbers:</h1>

        {numberList.length > 0 && (
          <div className="numberDisplay">
            <p>Numbers Entered: {numberList.join(', ')}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            className="mainInput"
            type="text"
            value={numbers}
            onChange={handleInputChange}
            placeholder="Enter a series of numbers (e.g., 1, 2, 3)"
          />

          <button
            className="mainButton"
            type="submit"
            disabled={loading || numberList.length < 1}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        <button
          className="previousButton"
          onClick={handleShowPrevious}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Show Previous'}
        </button>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        {tree && (
          <div className="currTree">
            <h2>Current Tree</h2>
            <TreeViewer tree={tree} />
          </div>
        )}

        {previousTrees.length > 0 && (
          <div className="prevTrees">
            <h2>Previous Trees</h2>
            {previousTrees.map((t, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <TreeViewer tree={t} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeInput;
