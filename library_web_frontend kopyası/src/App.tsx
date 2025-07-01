import { Toaster } from "sonner";
import BookList from "./components/Books/BookList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoggedInInfoContextProvider from "./components/Context/LoggedInInfoContext";
import Login from "./components/Auth/Login";
import AnonymousLayout from "./components/Layouts/AnonymousLayout";
import UserLayout from "./components/Layouts/UserLayout";
import Register from "./components/Auth/Register";

function App() {
  const router = createBrowserRouter([
    {
      element: <UserLayout />,
      children: [
        {
          path: "/",
          element: (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "30vh",
                textAlign: "center",
                color: "#fff",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
                Welcome to the library.
              </h1>
              <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
                Is the book you want available in the library? Let’s take a look!
              </p>
            </div>
          ),
          errorElement: <p>Sayfa Yok</p>,
        },
        {
          path: "/Books",
          element: <BookList />,
        },
      ],
    },
    {
      element: <AnonymousLayout />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ]);
  return (
    <>
      <LoggedInInfoContextProvider>
        <Toaster richColors position="top-center" />
        <RouterProvider router={router} />
      </LoggedInInfoContextProvider>
    </>
  );
}

export default App;