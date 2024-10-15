import React, { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { clearUserRole,setUserRole } from "../../redux/userSlice";
import { toast } from 'react-toastify';

function UserLogin() {
  const { rst_id, tbl_id } = useParams();
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.user.role);

  useEffect(()=>{
    if(userRole!='Customer'){
      dispatch(clearUserRole());
      localStorage.removeItem('role');
      localStorage.removeItem('rst_id');
    }
  })
  

  const [data, setData] = useState({
    mobile: '',
    name:''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // State for handling validation errors
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const validateMobile = (mobile) => {
    // Ensure mobile number is exactly 10 characters and consists only of digits
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
  };

  const login = (e) => {
    e.preventDefault(); // Prevent form submission by default
    
    if (!validateMobile(data.mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setError(""); // Clear any previous error
    setLoading(true);

    // Simulate API login process or localStorage
    setTimeout(() => {      
      dispatch(setUserRole({role:"Customer"}));
      localStorage.setItem('role', 'Customer');
      localStorage.setItem("mobile", btoa(data.mobile));
      localStorage.setItem("user", btoa(data.name));

      localStorage.setItem("rst_id", rst_id);
      localStorage.setItem("tbl_id", tbl_id);

      setLoading(false);
      navigate("/user");
      toast.success("Logged in successfully!");
    }, 1000);
  };

  return (
    <>
      <div className="forgot-password-container">
        <div className="card forgot-password-card">
          <h2 className="text-center mb-4">Table Booking</h2>
          <form onSubmit={login}>
            <div className="form-group">
              <label htmlFor="mobile" className="mb-1">Mobile</label>
              <input
                type="text"
                id="mobile"
                value={data.mobile}
                name="mobile"
                onChange={handleInputChange}
                className={`form-control ${error ? 'is-invalid' : ''}`}
                placeholder="Enter Mobile No."
                required
              />
              {error && <div className="invalid-feedback">{error}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="mobile" className="mb-1">Name</label>
              <input
                type="text"
                id="name"
                value={data.name}
                name="name"
                onChange={handleInputChange}
                className={`form-control ${error ? 'is-invalid' : ''}`}
                placeholder="Enter Name"
                required
              />
              {error && <div className="invalid-feedback">{error}</div>}
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-block mt-4" disabled={loading}>
                {loading ? 'Loading...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserLogin;
