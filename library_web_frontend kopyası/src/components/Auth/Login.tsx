import { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "sonner";
import Cookies from "universal-cookie";
import { useLoggedInInfoContext } from "../Context/LoggedInInfoContext";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const cookies = new Cookies();
    const navigate = useNavigate(); // register sayfasına yönlendirme için 
    const { setLoggedInInfo } = useLoggedInInfoContext();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin() {
        fetch("http://localhost:5196/api/authentication/login", {
        method: "post",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
        .then((response) => {
            if (response.ok) return response.json();
            else return { errors: {e: "Unauthorized"}};
        })
        .then((response) => {
            if("errors" in response) {
                Object.keys(response.errors).forEach((k) => {
                    toast.error(response.errors[k]);
                });
            } else {
                cookies.set("loggedInUsername", response.username, {
                    expires: new Date(response.expireDate),
                });
                cookies.set("loggedInRole", response.role, {
                    expires: new Date(response.expireDate),
                });
                setLoggedInInfo(response);
            }
        });
    }
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#f4f4f9",
          backgroundImage: "url('/images/login.avif')", // Arkaplan resmi
        backgroundSize: "cover", // Resmi ekran boyutuna göre ayarla
        backgroundRepeat: "no-repeat", // Tekrar etmesini engelle
        backgroundPosition: "center 70%",
        }}
      >
        <div
           style={{
            background: "rgba(255, 255, 255, 0.9)", // Şeffaf beyaz arka plan
            padding: "2rem",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            maxWidth: "400px",
            width: "100%",
            backdropFilter: "blur(10px)", // Arkaplanı bulanıklaştır (opsiyonel)
           }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "1.5rem",
              color: "#333",
              fontWeight: "500",
            }}
          >
            Login
          </h2>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              name="name"
              value={username}
              className="form-control"
              placeholder="Username"
              style={{
                borderRadius: "5px",
                border: "1px solid #ddd",
                padding: "0.8rem",
                fontSize: "0.9rem",
              }}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
  
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              name="password"
              value={password}
              className="form-control"
              placeholder="Password"
              type="password"
              style={{
                borderRadius: "5px",
                border: "1px solid #ddd",
                padding: "0.8rem",
                fontSize: "0.9rem",
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
  
          <button
            className="btn btn-success w-100"
            style={{
              backgroundColor: "#3F2903",
              color: "white", 
              borderRadius: "5px", 
              padding: "0.8rem", 
              fontSize: "1rem", 
              fontWeight: "bold", 
              border: "none", 
              cursor: "pointer", //butona fare imleci eklenir
            }}
            onClick={handleLogin}
          >
            Login
          </button>
  
          <div
            className="text-center mt-3"
            style={{
              fontSize: "0.9rem",
              color: "#555",
            }}
          >
            <span>Don’t have an account?</span>
            <button
              className="btn btn-link"
              style={{
                textDecoration: "none",
                fontWeight: "bold",
                marginLeft: "5px",
                color: "#007bff",
              }}
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;