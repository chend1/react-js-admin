import { useEffect } from 'react';
import { useRoutes, useLocation, useNavigate } from "react-router-dom";
import { getStorage } from '../utils/storage';
import { useSelector } from 'react-redux';
function router () {
  const routerMenu = useSelector(state => state.main.routerMenu)
  const element = useRoutes(routerMenu);
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