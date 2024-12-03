import { useEffect } from 'react';
import { useRoutes, useLocation, useNavigate } from "react-router-dom";
import { getStorage } from '../utils/storage';
import routes from "./index";
function router () {
  const element = useRoutes(routes);
  return element
}

// 路由守卫
function RouterGuard(RouterComponent) {
  return function protectedRoute(props) {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
      const token = getStorage('token');
      if (!token) {
        navigate('/login');
      } else {
        if (location.pathname === '/login') {
          navigate('/');
        }
      }
    }, [location.pathname, navigate]);
    return <RouterComponent {...props} />;
  }
}

export default RouterGuard(router)