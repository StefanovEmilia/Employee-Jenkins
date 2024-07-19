import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider} from "react-router-dom";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import EmployeeList from "./Pages/EmployeeList";
import EmployeeCreator from "./Pages/EmployeeCreator";
import EmployeeUpdater from "./Pages/EmployeeUpdater";
import Employees from "./Pages/Employees";

import "./main.css";
import TableTest from "./Pages/TableTest";
import FormTest from "./Pages/FormTest";
import EquipmentList from "./Pages/EquipmentList";
import EquipmentCreator from "./Pages/EquipmentCreator";
import EquipmentUpdater from "./Pages/EquipmentUpdater";


const router = (props) => createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <EmployeeList attended={props.attended} setAttended={ props.setAttended} />,
      },
      {
        path: "/employees/:search",
        element: <Employees />
      },
      {
        path: "/missing",
        element: <EmployeeList attended={props.attended} setAttended={props.setAttended} />
      },
      {
        path: "/create",
        element: <EmployeeCreator />,
      },
      {
        path: "/update/:id",
        element: <EmployeeUpdater />,
      },
      {
        path: "/table-test",
        element: <TableTest />,
      },
      {
        path: "/form-test",
        element: <FormTest />,
      },
      {
        path: "/equipments",
        element: <EquipmentList />
      },
      {
        path: "/equipments/create",
        element: <EquipmentCreator />
      },
      {
        path: "/equipments/update/:id",
        element: <EquipmentUpdater />
      }
    ],
  },
]);

const App = () => {

  const [attended, setAttended] = useState([])

  return <RouterProvider router={router({ attended, setAttended })}/>;
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

