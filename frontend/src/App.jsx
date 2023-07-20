import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "src/components/auth/Login";
import Register from "src/components/auth/Register";
import { ToastContainer } from "react-toastify";
import { Layout } from "src/components/Layout/Layout";

const RequiredAuth = ({ children }) => {
  let location = useLocation();

  const token = localStorage.getItem("todo_token");
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

let router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: (
      <>
        {" "}
        <Register />
        <ToastContainer />
      </>
    ),
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "todo", // The root route
        index: true,
        element: (
          <>
            Here is the child element
            <Outlet />
          </>
        ),
        // Redirect to /todo
      },
      {
        path: "/todo",
        element: <>Your All Todo is here</>,
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;

// children: [
//   {
//     path: "/", // The root route
//     index: true,
//     element: <Redirect to="/todo" />,
//     // Redirect to /todo
//   },
//   {
//     path: "/todo",
//     index: true,
//     element: <>Your All Todo is here</>,
//   },
// ],
