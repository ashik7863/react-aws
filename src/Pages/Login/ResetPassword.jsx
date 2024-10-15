import React, { useState, useContext } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { Resetpassword } from "../../Services/Login";

function ResetPassword() {
 
    let {id}=useParams();
    id=atob(id);
    const [data, setData] = useState({
      rst_id: id,
      password:'',
      con_password:'' 
    });
  
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
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
        let res = await Resetpassword(data);

        if (res.status == 200) {
          toast.success(res.msg);
          setTimeout(()=>{
            navigate(`/login`);
          },1500)
                  
        } else {          
          toast.error(res.msg);
        }
      } catch (err) {
        toast.error('Failed to reset password');
      } finally {
        setLoading(false);
      }
    };

  return (
    <>
      <div className="forgot-password-container">
      <div className="card forgot-password-card">
        <h2 className="text-center mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="email">New Password</label>
            <input
              type="password"
              id="otp"
              className="form-control"
              placeholder="Password"
              value={data.password}
              name="password"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="email">New Confirm Password</label>
            <input
              type="password"
              id="otp"
              className="form-control"
              placeholder="Confirm Password"
              value={data.con_password}
              name="con_password"
              onChange={handleInputChange}
              required
            />
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

export default ResetPassword;
