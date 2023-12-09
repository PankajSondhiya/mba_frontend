import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import LandingPage from "./pages/LandingPage/landingPage";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Client from "./pages/ClientPage/client";
import Admin from "./pages/AdminPage/admin";
import MovieDetails from "./pages/MovieDetails/movieDetails";
import MovieTheatres from "./pages/MovieTheatres/movieTheatres";
import "./App.css";
import Booking from "./pages/Booking/booking";
import RequireAuth from "./util/RequireAuth";
import { ADMIN, CLIENT, CUSTOMER } from "./constants";
import Unauthorized from "./components/Unauthorised";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Auth />} />
      <Route element={<RequireAuth allowedRoles={[ADMIN]} />}>
        <Route path="/admin" element={<Admin />} />
      </Route>
      <Route element={<RequireAuth allowedRoles={[CLIENT]} />}>
        <Route path="/client" element={<Client />} />
      </Route>
      <Route element={<RequireAuth allowedRoles={[ADMIN, CLIENT, CUSTOMER]} />}>
        <Route
          path="/buytickets/:moviename/:movieId"
          element={<MovieTheatres />}
        />
      </Route>
      <Route path="/movie/:id/details" element={<MovieDetails />} />
      <Route path="/movie/:movieId/:theatreId" element={<Booking />} />
      <Route path="/unauthorised" element={<Unauthorized />} />
    </Routes>
  );
}

export default App;
