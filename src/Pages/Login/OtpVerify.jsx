import React, { useState, useContext } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { VerifyOtp } from "../../Services/Login";

function OtpVerify() {
 
    let {id}=useParams();
    id=atob(id);
    const [data, setData] = useState({
      rst_id: id,
      otp:'' 
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
        let res = await VerifyOtp(data);

        if (res.status == 200) {
          toast.success(res.msg);
          setTimeout(()=>{
            navigate(`/reset-password/${btoa(id)}`);
          },1500)
                  
        } else {          
          toast.error(res.msg);
        }
      } catch (err) {
        toast.error('Failed to verify otp'); // Show error notification
      } finally {
        setLoading(false);
      }
    };

  return (
    <>
      <div className="forgot-password-container">
      <div className="card forgot-password-card">
        <h2 className="text-center mb-4">OTP VERIFY</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">OTP</label>
            <input
              type="text"
              id="otp"
              className="form-control"
              placeholder="Enter the OTP"
              value={data.otp}
              name="otp"
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

export default OtpVerify;
