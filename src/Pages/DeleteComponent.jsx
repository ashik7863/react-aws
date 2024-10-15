import React from 'react';
import Swal from 'sweetalert2';

const DeleteComponent = ({ entityName, onDelete }) => {
  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: `Are you sure you want to delete ${entityName}?`,
        text: "This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        // Await the deletion function and get its response
        const response = await onDelete(); 
console.log(response)
        // Check if the response indicates success or failure
        if (response.status == 200) {
          Swal.fire('Deleted!', `${entityName} has been deleted.`, 'success');
        } else {
          Swal.fire('Error!', response.message || 'Failed to delete the item.', 'error');
        }
      }
    } catch (error) {
      // Show error message if deletion fails
      Swal.fire('Error!', 'There was an error deleting the item.', 'error');
    }
  };

  return (
    <button className="action-danger" onClick={handleDelete}>
      <iconify-icon icon="material-symbols-light:delete-outline" />
    </button>
  );
};

export default DeleteComponent;
