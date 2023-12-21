
import { Navigate, Outlet} from 'react-router-dom';

const ProtectedRoute = ({redirectPath = '/', children}) => {
  
  const session = sessionStorage.getItem('session');
  
  if (!session) {
    return <Navigate to={redirectPath} replace/>
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;