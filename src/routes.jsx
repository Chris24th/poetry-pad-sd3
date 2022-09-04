import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Verification from "./pages/Verification";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import ResetPassword from "./pages/ResetPassword";

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
];

export default routes;
