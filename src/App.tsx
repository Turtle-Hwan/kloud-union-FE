import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Index from "./pages/Index";
import Mypage from "./pages/mypage/Mypage";
import Home from "./pages/home/Home";
import { Header } from "./Header";
import { TodoList } from "./pages/todo/Todo";
import TokenRedirect from "./pages/token/TokenRedirect";

function App() {
  const routes = [
    {
      element: (
        <>
          <Header />
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
        {
          path: "/todo",
          element: <TodoList />,
        },
        {
          path: "/token-redirect",
          element: <TokenRedirect />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
