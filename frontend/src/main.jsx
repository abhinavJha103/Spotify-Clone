import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import AdminLogin from "./pages/adminLogin.jsx"
import AdminDashboard  from "./Dashboard/adminDashboard";
import UserLogin from "./pages/userLogin";
import UserRegistration from "./pages/userRegister";
import HomePage  from "./pages/HomePage";
import Error  from "./pages/components/Error";
import ProtectRoute from "./pages/components/ProtectRoute";
import MainLayout from "./layout/MainLayout";
import AlbumPage from "./pages/albumPage";



const router = createBrowserRouter([
  {
    element:<MainLayout/>,
    errorElement:<Error/>,
    children:[
      {
        path:"/",
        element:<HomePage/>
      },
      {
        path:"/albums/:albumId",
        element:<AlbumPage/>
      }
    ]
  },
  {
    path:"/adminLogin",
    element:<AdminLogin/>
  },
   
  {
    path: "/adminDashboard",
    element: <ProtectRoute element={<AdminDashboard />} />,  
  },
  {
    path:"/login",
    element:<UserLogin/>
  },
  {
    path:"/register",
    element:<UserRegistration/>
  }
  
])

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router}><App/></RouterProvider>
);
