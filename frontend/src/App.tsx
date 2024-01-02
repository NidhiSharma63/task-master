import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from 'react-router-dom';
import { Layout } from 'src/components/Layout/Layout';
import Login from 'src/pages/auth/Login';
import Register from 'src/pages/auth/Register';

import { ReactNode } from 'react';
import { CommonLoaderWithBackDrop } from 'src/common/loader/CommonLoader';
import Board from 'src/components/projectPage/Board';
import PageComponent from 'src/components/userPages/components/PageComponent';
import { KEY_FOR_STORING_TOKEN } from 'src/constant/Misc';
import NotFound from 'src/pages/error/NotFound';
import Home from 'src/pages/home/Home';
import Insights from 'src/pages/insights/Insights';
import ProjectPage from 'src/pages/project/ProjectPage';
import { getValueFromLS } from 'src/utils/localstorage';

const RequiredAuth = ({ children }: { children: ReactNode }) => {
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
    path: '/login',
    element: <Login />,
  },

  {
    path: '/register',
    element: (
      <>
        {' '}
        <Register />
      </>
    ),
  },
  {
    path: '/',
    element: (
      <RequiredAuth>
        <Layout />
        <CommonLoaderWithBackDrop />
      </RequiredAuth>
    ),
    children: [
      {
        path: 'Dashboard',
        element: <ProjectPage />,
        children: [
          {
            path: 'activeProject/board/:active_project',
            element: <Board />,
          },
        ],
      },

      {
        path: '/Charts/:status',
        element: <Insights />,
      },
      {
        path: '/Home',
        element: <Home />,
      },
      {
        path: '/pages/',
        element: <PageComponent />,
        children: [
          {
            path: ':id',
            element: <PageComponent />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
