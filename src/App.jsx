import { NavLink, Outlet  } from "react-router";
function App() {
  return (
    <>
      <nav>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
      </nav>
      <Outlet />
    </>
  )
}

export default App
