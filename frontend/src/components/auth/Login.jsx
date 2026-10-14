
import React, { useState } from "react";


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
const filehandleChange=(e)=>{
    setFormData({
        ...formData,
    file:e.target.files?.[0]
    })
}



  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Signup Data:", formData);

    alert("Signup form submitted successfully!");
  };

  return (
    <div className="signup-wrapper">
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
