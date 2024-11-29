import Home from "@/views/home/home";
import Login from "@/views/login/login";

const routes = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "home",
    element: <Home />,
  },
];
export default routes;