import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const IsUser = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log(user);
    if (user === null) {
      navigate("/user-login");
    }
  }, [navigate]); // Add 'navigate' to the dependency array
};
