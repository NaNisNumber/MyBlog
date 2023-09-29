import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./routes/Route";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import Home from "./pages/Home";
import ReadPost from "./pages/ReadPost";
import FavoritePosts from "./pages/FavoritePosts";
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
      {
        path: "/MyBlog/favorite-posts",
        element: <FavoritePosts />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <RouterProvider router={router} />
  </MantineProvider>
);
