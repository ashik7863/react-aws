import ApiClient from './ApiClient';

// Fetch students
export const CreateTable= async (resData) => {
    try {
        const response = await ApiClient.post('/add-table', resData,{
          headers: {
            'Content-Type': 'application/json',
        },
        });
        return response.data;
      } catch (error) {
        console.error('Error creating table', error);
        throw error;
      }
};
export const FetchTable = async (id) => {
  try {
      const response = await ApiClient.get(`/fetch-table/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching table', error);
      throw error;
    }
};
export const FetchTableByStaff = async (id) => {
  try {
      const response = await ApiClient.get(`/fetch-tableby-staff/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching table', error);
      throw error;
    }
};

export const DeleteTable = async (id) => {
  try {
      const response = await ApiClient.post('/delete-table',{id},{
        headers: {
            'Content-Type': 'application/json',
        },
    });
      return response.data;
    } catch (error) {
      console.error('Error deleting table', error);
      throw error;
    }
};