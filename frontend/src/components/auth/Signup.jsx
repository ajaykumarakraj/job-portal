import axios from "axios";
import React, { useState } from "react";
import Navbar  from "../shared/Navbar"

function Signup() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    number: "",
    password: "",
    role: "student",
    file: null,
  });

  const handleChange = (e) => {
   
    setFormData({
      ...formData,
      [e.target.name] : e.target.value,
      
    });
  };
const filehandleChange=(e)=>{
    setFormData({
        ...formData,
    file:e.target.files?.[0]
    })
}

  const handleSubmit = async(e) => {
    e.preventDefault();

    console.log("Signup Data:", formData);
const Data=new FormData()
Data.append("fullname",formData.fullname)
Data.append("email",formData.email)
Data.append("phoneNumber",formData.number)
Data.append("password",formData.password)
Data.append("role",formData.role)
if(formData.file){
    Data.append("file",formData.file)
}

try {
    const res=await axios.post("http://localhost:3000/api/v1/user/register",Data,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
    console.log("response",res.data)
//     if(res){
// console.log("response data",res.data.message)
//  alert("Signup form submitted successfully!");
//     }
    
} catch (error) {
    console.log("Status:", error.response?.status);
  console.log("Error message:", error.response?.data);
}
   
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
                  <h2 className="fw-bold">Create Account</h2>
                  <p className="text-muted">
                    Sign up as a student or recruiter
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Name */}
                  <div className="mb-3">
                    <label className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="fullname"
                      placeholder="Enter your full name"
                      value={formData.fullname}
                      onChange={handleChange}
                      required
                    />
                  </div>

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

                  {/* Mobile Number */}
                  <div className="mb-3">
                    <label className="form-label">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      name="number"
                      placeholder="Enter your mobile number"
                      value={formData.number}
                      onChange={handleChange}
                      pattern="[0-9]{10}"
                      maxLength={10}
                      title="Enter a valid 10-digit mobile number"
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
                      Register As
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

                  {/* File Upload */}
                  <div className="mb-4">
                    <label className="form-label">
                      Upload Resume / Document
                    </label>

                    <input
                      type="file"
                      className="form-control"
                      name="file"
                      accept="image/*"
                      onChange={filehandleChange}
                    />

                    <small className="text-muted">
                      Accepted formats: jpg,png
                    </small>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fw-semibold"
                  >
                    Create Account
                  </button>

                  <p className="text-center text-muted mt-4 mb-0">
                    Already have an account?{" "}
                    <a href="/login" className="text-primary fw-semibold">
                      Login
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

export default Signup;