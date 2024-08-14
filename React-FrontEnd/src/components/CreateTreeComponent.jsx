// import React, { useState } from 'react';
// import { useCreateTree } from '../api/TreeApi';

// const CreateTreeComponent = () => {
//     const [name, setName] = useState('');
//     const [createTree, { data, loading, error }] = useCreateTree(); // Destructure createTree function and other state

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // Trigger the useCreateTree hook
//             await createTree({ name }); // Pass the tree data
//         } catch (err) {
//             console.error('Error creating tree:', err);
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Tree Name:
//                     <input 
//                         type="text" 
//                         value={name} 
//                         onChange={(e) => setName(e.target.value)} 
//                     />
//                 </label>
//                 <button type="submit">Create Tree</button>
//             </form>
//             {loading && <p>Loading...</p>}
//             {error && <p>Error: {error.message}</p>}
//             {data && <p>Tree created with ID: {data.id}</p>}
//         </div>
//     );
// };

// export default CreateTreeComponent;
