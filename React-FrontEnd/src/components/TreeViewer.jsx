import React from 'react';
import '../style/treeviewer.css'; // Optional: Add CSS for styling

const TreeViewer = ({ tree }) => {
  if (!tree) {
    return <p>Please submit numbers to generate a tree.</p>;
  }

  // Format the tree object into JSON with the expected structure
  const formatTreeToJSON = (node) => {
    return {
      number: node.number, // Ensure this matches the backend JSON key
      left: node.left ? formatTreeToJSON(node.left) : null,
      right: node.right ? formatTreeToJSON(node.right) : null
    };
  };

  const formattedTree = JSON.stringify(formatTreeToJSON(tree), null, 2); // Pretty print with indentation

  return (
    <div  className = "treeDiv">
      <pre data-testid="pre">{formattedTree}</pre>
    </div>
  );
};

export default TreeViewer;
