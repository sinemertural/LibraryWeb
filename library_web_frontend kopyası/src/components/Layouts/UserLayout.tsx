import { Link, Navigate , Outlet } from "react-router-dom";
import { useLoggedInInfoContext } from "../Context/LoggedInInfoContext";

const UserLayout = () => {
    const { loggedInInfo, setLoggedInInfo } = useLoggedInInfoContext();

    function handleLogout() {
        fetch("http://localhost:5196/api/authentication/logout", {
          method: "post",
          credentials: "include",
          headers: { "content-type": "application/json" },
        }).then((response) => {
          if (response.ok) return setLoggedInInfo(undefined);
        });
      }
      if (loggedInInfo === undefined) return <Navigate to={"/login"} />;
      else
      return (
        <>
          <div
            style={{
              minHeight: "100vh", // Sayfa yüksekliğini kaplar
              backgroundImage: "url('/images/home.avif')", // Resim yolu
              backgroundSize: "cover", // Resmi ekran boyutuna göre ayarlar
              backgroundRepeat: "no-repeat", // Resmin tekrarını engeller
              backgroundPosition: "center", // Resmi ortalar
            }}
          >
          <div className="container p-5">
            <nav
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem 2rem",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>Welcome, {loggedInInfo.username}</h3>
            <div style={{ display: "flex", gap: "1rem" }}>
            <Link to={"/"} className="btn btn-outline-dark">
               Home
            </Link>
            <Link to={"/books"} className="btn btn-outline-dark">
              Books
            </Link>
            <button className="btn btn-danger" onClick={handleLogout}>
              Log out
            </button>
            </div>
            </nav>
              <Outlet />
            </div>
          </div>
        </>
      );
      
    };
    
    export default UserLayout;