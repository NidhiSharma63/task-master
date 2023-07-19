import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  Navigate,
} from "react-router-dom";
import Login from "src/components/auth/Login";
import Register from "src/components/auth/Register";

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
    element: <Register />,
  },
  {
    path: "/todo",
    element: (
      <RequiredAuth>
        <h1>This is Todo AKA PROTECTED ROUTE</h1>
      </RequiredAuth>
    ),
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;