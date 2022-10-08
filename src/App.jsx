import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes";
import NavbarRB from "./pages/components/NavbarRB";

const App = () => {
  return (
    <div>
      <Router>
        <NavbarRB />
        <Routes>
          {routes &&
            routes.map((route) => (
              <Route
                key={routes}
                exact
                path={route.url.toString()}
                element={route.page}
              />
            ))}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
