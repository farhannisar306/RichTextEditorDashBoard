import Dashboard from "../Layouts/Dashboard";
import RootLayout from '../Layouts/RootLayout'
import ArticlesPage from "../pages/ArticlesPage";
import { UsersPage } from "../pages/UsersPage";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import ContentLayout from "../Layouts/ContentLayout";

import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <ContentLayout />,
        children: [
          { path: "/", element: <Dashboard /> },
          { path: "/articles", element: <ArticlesPage /> },
          { path: "/users", element: <UsersPage /> },
          { path: "/users:a", element: <UsersPage /> },
          { path: "/users:b", element: <UsersPage /> },
          { path: "/users:c", element: <UsersPage /> },
        ]
      }
    ]
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;