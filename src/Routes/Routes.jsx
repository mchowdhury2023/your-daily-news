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
import TestimonialForm from "../Pages/Testimonial/TestimonialForm";
import SubscriptionPlans from "../Subscription/SubsciptionPlans";
import Payment from "../Pages/Payment/Payment";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";


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
          element:<PrivateRoute><AddArticle></AddArticle></PrivateRoute>
        },
        {
          path:'/articles/:id',
          element:<PrivateRoute><ArticleDetails></ArticleDetails></PrivateRoute>
        },
        {
          path:'/updatearticles/:id',
          element:<UpdateArticle></UpdateArticle>,
          loader:({params}) => fetch(`http://localhost:5000/articles/${params.id}`)

        },
        {
          path:'/my-articles',
          element:<PrivateRoute><MyArticles></MyArticles></PrivateRoute>
        },
        {
          path:'all-articles',
          element:<AllArticles></AllArticles>

        },
        {
          path:'/premium-articles',
          element:<PrivateRoute><PremiumArticles></PremiumArticles></PrivateRoute>
        },
        {
          path:'/subscription',
          element:<PrivateRoute><SubscriptionPlans></SubscriptionPlans></PrivateRoute>
        },
        {
          path:'/myprofile',
          element:<PrivateRoute><MyProfile></MyProfile></PrivateRoute>
          //loader:({params}) => fetch(`http://localhost:5000/users/${params.id}`)
        },
        {
          path:'/editprofile',
          element:<EditProfile></EditProfile>
        },
        {
          path:'/testimonials',
          element:<TestimonialForm></TestimonialForm>
        },
        {
          path:'/payment',
          element:<Payment></Payment>
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
          path:'publisherstat',
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
        },
        {
          path: "*",
          element: <PageNotFound></PageNotFound>,
        },
      ]
    }
  ]);

  export default router;