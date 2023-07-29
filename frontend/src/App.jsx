import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  Navigate,
} from "react-router-dom";
import Login from "src/pages/auth/Login";
import Register from "src/pages/auth/Register";
import { Layout } from "src/components/Layout/Layout";
import { getValueFromLS } from "src/utils/localstorage";
import { KEY_FOR_STORING_TOKEN } from "src/constant/Misc";
import NotFound from "src/pages/error/NotFound";
import ProjectPage from "src/pages/project/ProjectPage";
import Board from "src/components/projectPage/Board";
import Insights from "src/pages/insights/Insights";
import Home from "src/pages/home/Home";

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
        path: "Dashboard",
        element: <ProjectPage />,
        children: [
          {
            path: "activeProject/board/:active_project",
            element: <Board />,
          },
        ],
      },

      {
        path: "/Charts/:status",
        element: <Insights />,
      },
      {
        path: "/Home",
        element: <Home />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
