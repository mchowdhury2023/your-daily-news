import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AddArticle from "../Pages/Aricles/AddArticle";
import ArticleDetails from "../Pages/Aricles/ArticleDetails";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path: '/register',
            element:<Register></Register>

        },
        {
          path:'/add-articles',
          element:<AddArticle></AddArticle>
        },
        {
          path:'/articles/:id',
          element:<ArticleDetails></ArticleDetails>
        }
      ]
    },
  ]);

  export default router;