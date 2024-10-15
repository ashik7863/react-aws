import ApiClient from './ApiClient';

// Login
export const LoginAuth = async (resData) => {
    try {
        const response = await ApiClient.post('/login', resData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error while login', error);
        throw error;
    }
};
export const LoginAuthStaff = async (resData) => {
    try {
        const response = await ApiClient.post('/login-staff', resData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error while login', error);
        throw error;
    }
};

export const Forgotpassword = async (resData) => {
    try {
        const response = await ApiClient.post('/forgot-password', resData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error while sending otp', error);
        throw error;
    }
};
export const VerifyOtp = async (resData) => {
    try {
        const response = await ApiClient.post('/verify-otp', resData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const Resetpassword = async (resData) => {
    try {
        const response = await ApiClient.post('/reset-password', resData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
