
import { Navigate, Outlet} from 'react-router-dom';

const ProtectedRoute = ({session, redirectPath = '/', children}) => {

  if (!session) {
    return <Navigate to={redirectPath} replace/>
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;