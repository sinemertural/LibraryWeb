import { Navigate, Outlet } from "react-router";
import { useLoggedInInfoContext } from "../Context/LoggedInInfoContext";

const AnonymousLayout = () => {
  const { loggedInInfo } = useLoggedInInfoContext();

  if (loggedInInfo !== undefined) return <Navigate to={"/"} />;
  else
    return (
      <>
        <Outlet />
      </>
    );
};

export default AnonymousLayout;