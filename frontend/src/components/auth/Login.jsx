import React, { useState } from "react";
import axios from "axios";
import Navbar from "../shared/Navbar";
function Login() {
  const [formData, setFormData] = useState({
    
    email: "",
 
    password: "",
    role: "student",
  
  });

  const handleChange = (e) => {
   
    setFormData({
      ...formData,
      [e.target.name] : e.target.value,
      
    });
  };



  const handleSubmit = async(e) => {
    e.preventDefault();

    console.log("login Data:", formData);
const payload={
  email:formData.email,
  password:formData.password,
  role:formData.role
}
console.log(payload)
try {
    const res=await axios.post("http://localhost:3000/api/v1/user/login",payload)
    console.log("response data",res)
} catch (error) {
    console.log(error)
}
    alert("Signup form submitted successfully!");
  };

  return (
    <div className="signup-wrapper">
      <Navbar/>
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card signup-card border-0">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">login Account</h2>
                  <p className="text-muted">
                    login as a student or recruiter
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
              

                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

               
                  {/* Password */}
                  <div className="mb-3">
                    <label className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      minLength={8}
                      required
                    />
                  </div>

                  {/* Role */}
                  <div className="mb-3">
                    <label className="form-label d-block">
                      login As
                    </label>

                    <div className="row g-3">
                      <div className="col-6">
                        <input
                          type="radio"
                          className="btn-check"
                          name="role"
                          id="student"
                          value="student"
                          checked={formData.role === "student"}
                          onChange={handleChange}
                        />

                        <label
                          className="btn btn-outline-primary w-100 role-btn"
                          htmlFor="student"
                        >
                          Student
                        </label>
                      </div>

                      <div className="col-6">
                        <input
                          type="radio"
                          className="btn-check"
                          name="role"
                          id="recruiter"
                          value="recruiter"
                          checked={formData.role === "recruiter"}
                          onChange={handleChange}
                        />

                        <label
                          className="btn btn-outline-primary w-100 role-btn"
                          htmlFor="recruiter"
                        >
                          Recruiter
                        </label>
                      </div>
                    </div>
                  </div>

                

                  {/* Submit */}
                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fw-semibold"
                  >
                 Login
                  </button>

                  <p className="text-center text-muted mt-4 mb-0">
                    Already have an account?{" "}
                    <a href="/signup" className="text-primary fw-semibold">
                      Signup
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;