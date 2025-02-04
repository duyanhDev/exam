import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRouter = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login"></Navigate>; //redict
  }

  return <>{props.children}</>;
};

export default PrivateRouter;
