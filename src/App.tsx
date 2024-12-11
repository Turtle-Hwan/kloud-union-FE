import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Index from "./pages/Index";
import Mypage from "./pages/mypage/Mypage";

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
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
