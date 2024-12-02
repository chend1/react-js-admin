import Home from "@/views/home/home";
import { HomeOutlined } from "@ant-design/icons";

const routes = [
  {
    path: "home",
    element: <Home />,
    label: "首页",
    key: "home",
    icon: <HomeOutlined />,
  },
];
export default routes;