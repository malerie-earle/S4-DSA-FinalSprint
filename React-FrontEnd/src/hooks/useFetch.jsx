// import useFetch from '../hooks/useFetch';

// // Base API URL for tree-related operations
// const API_URL = 'http://localhost:8080/api/trees';

// /**
//  * Hook to fetch a specific tree by its ID.
//  * @param {string} treeId - The ID of the tree to fetch.
//  * @returns {object} - The result of the fetch operation.
//  */
// const useFetchTree = (treeId) => {
//   const url = `${API_URL}/${treeId}`;
//   return useFetch(url);
// };

// /**
//  * Hook to create a new tree.
//  * @param {object} tree - The tree data to create.
//  * @returns {object} - The result of the fetch operation.
//  */
// const useCreateTree = (tree) => {
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(tree),
//   };
//   return useFetch(API_URL, options);
// };

// export { API_URL, useFetchTree, useCreateTree };
