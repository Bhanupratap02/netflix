import Home from "./home/Home";
import "./App.scss"
import Watch from "./pages/watch/Watch";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from "./authContext/AuthContext"
const App = () => {
 const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Home user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/movies"
          element={
            user ? <Home type="movie" user={user} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/series"
          element={
            user ? <Home type="series" user={user} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/watch"
          element={user ? <Watch /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;