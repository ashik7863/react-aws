import ApiClient from './ApiClient';

// Fetch students
export const CreateStaff= async (resData) => {
    try {
        const response = await ApiClient.post('/add-staff', resData);
        return response.data;
      } catch (error) {
        console.error('Error creating staff', error);
        throw error;
      }
};
export const FetchStaff = async (id) => {
  try {
      const response = await ApiClient.get(`/fetch-staff/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching staff', error);
      throw error;
    }
};
export const DeleteStaff = async (id) => {
  try {
      const response = await ApiClient.post('/delete-staff',{id},{
        headers: {
            'Content-Type': 'application/json',
        },
    });
      return response.data;
    } catch (error) {
      console.error('Error deleting staff', error);
      throw error;
    }
};