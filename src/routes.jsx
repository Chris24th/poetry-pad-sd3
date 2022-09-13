import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import Home from "./pages/auth/Home";
import Verification from "./pages/auth/Verification";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import About from "./pages/auth/About";
import ResetPassword from "./pages/auth/ResetPassword";
import NewPoem from "./pages/NewPoem";
import Collection from "./pages/Collection";
import EditPoem from "./pages/EditPoem";

const routes = [
  {
    url: "/",
    page: <Home />,
  },
  {
    url: "/about",
    page: <About />,
  },
  {
    url: "/signup",
    page: <SignUp />,
  },
  {
    url: "/signin",
    page: <SignIn />,
  },
  {
    url: "/verification",
    page: <Verification />,
  },
  {
    url: "/forgotpassword",
    page: <ForgotPassword />,
  },
  {
    url: "/resetpassword",
    page: <ResetPassword />,
  },
  {
    url: "/dashboard",
    page: <Dashboard />,
  },
  {
    url: "/profile",
    page: <Profile />,
  },
  {
    url: "/createpoem",
    page: <NewPoem />,
  },
  {
    url: "/collection",
    page: <Collection />,
  },
  {
    url: "/editpoem",
    page: <EditPoem />,
  },
];

export default routes;
