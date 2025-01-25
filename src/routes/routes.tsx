import HomeLayout from "../Layouts/HomeLayout";
import RootLayout from '../Layouts/RootLayout'

import { createBrowserRouter } from 'react-router-dom';
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <HomeLayout />,
      },
    ],
  },
])


export default router;