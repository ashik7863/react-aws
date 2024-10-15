import ApiClient from './ApiClient';

// Fetch students
export const CreateRestaurant = async (resData) => {
    try {
        const response = await ApiClient.post('/add-restaurant', resData);
        return response.data;
      } catch (error) {
        console.error('Error creating restaurant', error);
        throw error;
      }
};
export const FetchRestaurant = async () => {
  try {
      const response = await ApiClient.get('/fetch-restaurant');
      return response.data;
    } catch (error) {
      console.error('Error creating restaurant', error);
      throw error;
    }
};
export const DeleteRestaurant = async (id) => {
  try {
      const response = await ApiClient.post('/delete-restaurant',{id},{
        headers: {
            'Content-Type': 'application/json',
        },
    });
      return response.data;
    } catch (error) {
      console.error('Error deleting restaurant', error);
      throw error;
    }
};