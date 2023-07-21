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
import { getValueFromLS } from "src/utils/localstorage";
import { KEY_FOR_STORING_TOKEN } from "src/constant/Misc";

const RequiredAuth = ({ children }) => {
  let location = useLocation();

  const token = getValueFromLS(KEY_FOR_STORING_TOKEN);

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (token) {
    return children;
  }
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
      </>
    ),
  },
  {
    path: "/",
    element: (
      <RequiredAuth>
        <Layout />
      </RequiredAuth>
    ),
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
