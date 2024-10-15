import ApiClient from './ApiClient';

// Fetch students

export const FetchOrderByMobile = async (mobile) => {
  try {
      const response = await ApiClient.get(`/fetch-order-by-mobile/${mobile}`);
      return response.data;
    } catch (error) {
      console.error('Error creating menu', error);
      throw error;
    }
};

export const FetchOrderRestaurant = async (id) => {

  try {
      const response = await ApiClient.get(`/fetch-order-by-restaurant/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error creating menu', error);
      throw error;
    }
};