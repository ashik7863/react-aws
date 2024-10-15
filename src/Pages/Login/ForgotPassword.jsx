import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Forgotpassword } from "../../Services/Login";
import { toast } from 'react-toastify';

function ForgotPassword() {
  const [data, setData] = useState({
    email: '', 
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
      let res = await Forgotpassword(data); // Call the API
      if (res.status === 200) {
        let {rst_id}=res.data;
        let rstId=btoa(rst_id);
        toast.success(res.msg);
        setTimeout(()=>{
          navigate(`/otp-verify/${rstId}`);
        },1500)
                
      } else {
        toast.error(res.msg); // Show error notification
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed to send otp'); // Show error notification
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="forgot-password-container">
      <div className="card forgot-password-card">
        <h2 className="text-center mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email ID</label>
            <input
              type="email"
              id="email"
              value={data.email}
              name="email"
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter your email"
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

export default ForgotPassword;
