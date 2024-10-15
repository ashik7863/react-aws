import ApiClient from './ApiClient';

// Fetch students
export const CreateMenu = async (resData) => {
    try {
        const response = await ApiClient.post('/add-menu', resData);
        return response.data;
      } catch (error) {
        console.error('Error creating menu', error);
        throw error;
      }
};
export const FetchMenu = async (id) => {

  try {
      const response = await ApiClient.get(`/fetch-menu/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error creating menu', error);
      throw error;
    }
};

export const DeleteMenu = async (id) => {
  try {
      const response = await ApiClient.post('/delete-menu',{id},{
        headers: {
            'Content-Type': 'application/json',
        },
    });
      return response.data;
    } catch (error) {
      console.error('Error deleting menu', error);
      throw error;
    }
};