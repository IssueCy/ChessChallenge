import { useState } from "react";
import { useAuth } from "./auth";
import styled from "styled-components";
import Footer from "./Footer";

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      setMessage("Password reset email sent! Please check your inbox.");
      setError("");
    } catch (err) {
      setError("Error sending reset email.");
      setMessage("");
    }
  };

  return (
<div className="wrapper">
      <div className="content">
        <StyledWrapper>
          <div className="card">
            <h4 className="title">Reset Password</h4>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleReset}>
              <div className="field">
                <input
                  type="Email"
                  placeholder="Enter your email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button className="btn" type="submit">Send reset email</button>
            </form>
          </div>
        </StyledWrapper>
      </div>
      <Footer />
    </div>

    
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 250px;
    padding: 2rem;
    text-align: center;
    background: #2a2b38;
  }
  .field {
    margin-top: .5rem;
    background-color: #1f2029;
    border-radius: 4px;
    padding: .5em 1em;
  }
  .input-field {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    color: #d3d3d3;
  }
  .btn {
    margin: 1rem;
    border: none;
    border-radius: 4px;
    padding: 0.6em 1.2em;
    background-color: #ffeba7;
    color: #5e6681;
    transition: all .3s ease-in-out;
  }
  .btn:hover {
    background-color: #5e6681;
    color: #ffeba7;
  }
`;

export default ResetPassword;
