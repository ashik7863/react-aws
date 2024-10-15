import { useNavigate } from 'react-router-dom';
export const IsSuperAdmin=()=>{
    const navigate = useNavigate();
    const owner = localStorage.getItem("owner");
    if (owner !== "Super Admin") {
        navigate("/admin-dashboard");
    }
}