import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes";
import NavbarRB from "./NavbarRB";
import { useEffect, useState } from "react";

const App = () => {
  const user = JSON.parse(localStorage.getItem("user-data"));

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
