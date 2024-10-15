import ApiClient from './ApiClient';

export const FetchCustomer = async (id) => {
    try {
        const response = await ApiClient.get(`/fetch-customer/${id}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching customer', error);
        throw error;
      }
  };