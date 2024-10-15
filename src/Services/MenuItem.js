import ApiClient from './ApiClient';

// Fetch students
export const CreateMenuItem= async (resData) => {
    try {
        const response = await ApiClient.post('/add-menu-item', resData,{
          headers: {
              'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
      } catch (error) {
        console.error('Error creating menu item', error);
        throw error;
      }
};
export const FetchMenuItem = async (id) => {
  try {
      const response = await ApiClient.get(`/fetch-menu-item/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching menu item', error);
      throw error;
    }
};
export const DeleteMenuItem = async (id) => {
  try {
      const response = await ApiClient.post('/delete-menu-item',{id},{
        headers: {
            'Content-Type': 'application/json',
        },
    });
      return response.data;
    } catch (error) {
      console.error('Error deleting menu item', error);
      throw error;
    }
};