import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleRegister() {
    fetch("http://localhost:5196/api/Authentication/Register", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        confirmPassword: confirmPassword,
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else return response.json().then((data) => {
          throw data;
        });
      })
      .then(() => {
        toast.success("Registration successful! You can now log in.");
        navigate("/login");
      })
      .catch((error) => {
        if (error.errors) {
          Object.keys(error.errors).forEach((key) => {
            toast.error(error.errors[key]);
          });
        } else {
          toast.error("An unexpected error occurred.");
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
        backgroundImage: "url('/images/login.avif')", // Arka plan resmi
        backgroundSize: "cover", // Resmi ekran boyutuna göre ayarla
        backgroundRepeat: "no-repeat", // Tekrar etmesini engelle
        backgroundPosition: "center 70%", // Resmi ortala
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
          backdropFilter: "blur(10px)", // Arka planı bulanıklaştır
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
          Register
        </h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            name="username"
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

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            value={confirmPassword}
            className="form-control"
            placeholder="Confirm Password"
            type="password"
            style={{
              borderRadius: "5px",
              border: "1px solid #ddd",
              padding: "0.8rem",
              fontSize: "0.9rem",
            }}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary"
          style={{
            width: "100%",
            padding: "0.8rem",
            backgroundColor: "#3F2903",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={handleRegister}
        >
          Register
        </button>
        <div
          className="text-center mt-3"
          style={{
            fontSize: "0.9rem",
            color: "#555",
          }}
        >
          Already have an account?{" "}
          <button
            className="btn btn-link"
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              marginLeft: "5px",
              color: "#007bff",
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
