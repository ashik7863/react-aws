import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { setUserRole } from "../../redux/userSlice";
import { LoginAuthStaff } from '../../Services/Login';
import { toast } from 'react-toastify';

function StaffLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.user.role);

  useEffect(()=>{
    if(userRole=='Staff'){
      navigate("/staff");
    }
  },[userRole])

  const [data, setData] = useState({
    emp_id: '', 
    password: '', 
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res = await LoginAuthStaff(data);
      if (res.status === 200) {
        toast.success(res.msg);
        dispatch(setUserRole({role:"Staff"}));
        localStorage.setItem('role', 'Staff');
        navigate("/staff");        
      } else {
        toast.error(res.msg); // Show error notification
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed to login'); // Show error notification
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login_page">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 mr-auto">
              <div className="logo_from">
                <form onSubmit={handleSubmit}>
                  <div className="lgin_logo">
                    <img src="assets/images/logo.png" alt="" />
                  </div>
                  <p>Login For Staff</p>
                  <div className="row g-3">
                    <div className="col-lg-12">
                      <input required type="text" value={data.emp_id} name="emp_id" placeholder="Employee ID" onChange={handleInputChange} />
                    </div>
                    <div className="col-lg-12">
                      <input required type="password" value={data.password} name="password" placeholder="Password" onChange={handleInputChange} />
                    </div>
                    <div className="col-lg-12 ">
                      <p className="text-start mb-0 forgot_pas"><Link to="/forgot-password">Forgot password?</Link></p>
                    </div>
                    <div className="col-lg-12">
                      <button type="submit" className="btnnn1" disabled={loading}>
                        {loading ? 'Logging in...' : 'Log In'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StaffLogin;
