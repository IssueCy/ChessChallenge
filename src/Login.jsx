import { useState } from "react";
import { useAuth } from "./auth";
import styled from "styled-components";

const Login = () => {
  const { login, register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError("Fehler beim Login. Überprüfe deine Daten.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
    } catch (err) {
      setError("Fehler bei der Registrierung.");
    }
  };

  return (
    <StyledWrapper>
      <div className="card">
        <h4 className="title">Login oder Registrieren</h4>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form>
          <div className="field">
            <input 
              autoComplete="off" 
              placeholder="Email" 
              className="input-field" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <input 
              autoComplete="off" 
              placeholder="Password" 
              className="input-field" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn" onClick={handleLogin}>Login</button>
          <button className="btn" onClick={handleRegister}>Registrieren</button>
        </form>
      </div>
    </StyledWrapper>
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

export default Login;