import { Outlet, Link, useLocation } from "react-router-dom";

import "./Layout.css";

const Layout = () => {
  const location = useLocation()
  const isEquipmentsRoute = location.pathname.startsWith("/equipments")

  return (
  
    <div className="Layout">
      <nav>
        <ul>
          <li className="grow">
            <Link to="/">Employees</Link>
          </li>
          <li className="grow">
            <Link to="/equipments">Equipments</Link>
          </li>
          <li>
            {isEquipmentsRoute ? (
              <Link to="/equipments/create">
                <button type="button">Create Equipment</button>
              </Link>
            ) : (
              <Link to="/create">
                <button type="button">Create Employee</button>
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
};

export default Layout;
