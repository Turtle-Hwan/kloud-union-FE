import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Index from "./pages/Index";
import Mypage from "./pages/mypage/Mypage";
import Home from "./pages/home/Home";

function App() {
  const routes = [
    {
      element: (
        <>
          <Outlet />
        </>
      ),
      children: [
        { path: "/", element: <Index /> },
        {
          path: "/mypage",
          element: <Mypage />,
        },
        {
          path: "/home",
          element: <Home />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
