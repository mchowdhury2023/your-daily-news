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
import MyProfile from "../Pages/Profile/MyProfile";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import EditProfile from "../Pages/Profile/EditProfile";
import MyArticles from "../Pages/Aricles/MyArticles";
import PremiumArticles from "../Pages/Aricles/PremiumArticles";
import DashboardLayout from "../Layout/DashboardLayout";
import AllUsers from "../Dashboard/AllUsers";
import AddPublisher from "../Dashboard/AddPublisher";
import AdminHome from "../Dashboard/AdminHome";
import UpdateArticle from "../Pages/Aricles/UpdateArticle";
import AdminAllArticles from "../Dashboard/AdminAllArticles";
import AllArticles from "../Pages/Aricles/AllArticles";

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
        },
        {
          path:'/updatearticles/:id',
          element:<UpdateArticle></UpdateArticle>,
          loader:({params}) => fetch(`http://localhost:5000/articles/${params.id}`)

        },
        {
          path:'/my-articles',
          element:<MyArticles></MyArticles>
        },
        {
          path:'all-articles',
          element:<AllArticles></AllArticles>

        },
        {
          path:'/premium-articles',
          element:<PremiumArticles></PremiumArticles>
        },
        {
          path:'/myprofile',
          element:<MyProfile></MyProfile>,
          //loader:({params}) => fetch(`http://localhost:5000/users/${params.id}`)
        },
        {
          path:'/editprofile',
          element:<EditProfile></EditProfile>
        },
        {
          path: "*",
          element: <PageNotFound></PageNotFound>,
        },
      ]
    },
    {
      path:'dashboard',
      element:<DashboardLayout></DashboardLayout>,
      children:[
        {
          path:'adminhome',
          element:<AdminHome></AdminHome>
        },
        {
          path:'allusers',
          element:<AllUsers></AllUsers>
        },
        {
          path:'addpublisher',
          element:<AddPublisher></AddPublisher>
        },
        {
          path:'allarticles',
          element:<AdminAllArticles></AdminAllArticles>
        }
      ]
    }
  ]);

  export default router;