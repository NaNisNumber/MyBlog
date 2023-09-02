import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./routes/Route";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ReadPost from "./pages/ReadPost";

const router = createBrowserRouter([
  {
    path: "/MyBlog",
    element: <Root />,
    children: [
      {
        path: "/MyBlog",
        element: <Home />,
      },
      {
        path: "/MyBlog/post/:id",
        element: <ReadPost />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
